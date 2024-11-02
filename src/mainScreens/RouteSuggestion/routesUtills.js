import axios from 'axios';
import polyline from '@mapbox/polyline';
import { useState, useEffect } from 'react';
import constants from '../../consts/constants';

const apiKey = constants.map_api_key;

// Function to get possible routes between two cities
const getRoutesBetweenCities = async (originCity, destinationCity) => {
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(originCity)}&destination=${encodeURIComponent(destinationCity)}&alternatives=true&key=${apiKey}`;
    
    try {
        const response = await axios.get(directionsUrl);
        const routes = response.data.routes;

        if (!routes.length) {
            throw new Error("No routes found");
        }

        // Return first two polyline strings for the routes (assuming there are two)
        return routes.slice(0, 2).map(route => route.overview_polyline.points);
    } catch (error) {
        throw new Error('Error fetching routes:', error);
    }
};

// Function to extract cities/towns along a given route
const getCitiesOnRoute = async (polylinePoints) => {
    const placesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const cities = [];

    // Decode polyline to get latitude and longitude pairs
    const decodedPath = polyline.decode(polylinePoints);

    for (let i = 0; i < decodedPath.length; i += 10) { // Sampling every 10th point
        const [lat, lng] = decodedPath[i];
        const queryUrl = `${placesUrl}?location=${lat},${lng}&radius=5000&type=locality&key=${apiKey}`;

        try {
            const response = await axios.get(queryUrl);
            const places = response.data.results;

            places.forEach(place => {
                if (!cities.includes(place.name)) {
                    cities.push(place.name); // Add unique city/town
                }
            });
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    }

    return cities;
};

// Function to get distance between two cities
const getDistanceBetweenCities = async (city1, city2) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${city1}&destinations=${city2}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const distance = response.data.rows[0].elements[0].distance.value / 1000; // Distance in kilometers
        return distance;
    } catch (error) {
        throw new Error(`Error getting distance between ${city1} and ${city2}:`, error);
    }
};

// Function to convert routes to distance matrix format
const convertRoutesToMatrix = async (routes) => {
    const edges = [];

    for (const [routeKey, cities] of Object.entries(routes)) {
        console.log(`Processing ${routeKey}`);

        for (let i = 0; i < cities.length - 1; i++) {
            const city1 = cities[i];
            const city2 = cities[i + 1];
            const distance = await getDistanceBetweenCities(city1, city2);

            if (distance !== null) {
                edges.push([city1, city2, distance]);
                edges.push([city2, city1, distance]); // Add reverse edge
            }
        }
    }

    return edges;
};

// React Hook to get the distance matrix
export const useDistanceMatrix = (originCity, destinationCity) => {
    const [distanceMatrix, setDistanceMatrix] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDistanceMatrix = async () => {
            setLoading(true);
            try {
                const routes = await getRoutesBetweenCities(originCity, destinationCity);
                if (!routes) {
                    throw new Error("No routes available");
                }

                const routesCities = {}; // Object to hold arrays of cities for each route

                const promises = routes.map(async (polylinePoints, index) => {
                    console.log(`\nExtracting cities for Route ${index + 1}`);
                    const cities = await getCitiesOnRoute(polylinePoints);
                    // Save the cities in the object with route index as the key
                    routesCities[`Route_${index + 1}`] = cities;
                });

                await Promise.all(promises);

                const matrix = await convertRoutesToMatrix(routesCities);
                setDistanceMatrix(matrix);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (originCity && destinationCity) {
            fetchDistanceMatrix();
        }
    }, [originCity, destinationCity]);

    return { distanceMatrix, loading, error };
};

// Usage in a React Component
// import { useDistanceMatrix } from './path-to-your-hook-file';

// function MyComponent() {
//     const { distanceMatrix, loading, error } = useDistanceMatrix('CityA', 'CityB');

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             {distanceMatrix && distanceMatrix.map((edge, index) => (
//                 <p key={index}>{edge.join(' - ')}</p>
//             ))}
//         </div>
//     );
// }

