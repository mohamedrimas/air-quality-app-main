import { useState, useEffect } from "react";
import axios from "axios";
import constants from "../../../consts/constants";

const GOOGLE_MAPS_APIKEY = constants.map_api_key;

export const useShortestRoute = (citynames) => {
  const [coordinates, setCoordinates] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Utility function to get coordinates for city names
  const getCoordinatesFromCityNames = async () => {
    try {
      const coords = await Promise.all(
        citynames.map(async (city) => {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_MAPS_APIKEY}`
          );
          const location = response.data.results[0].geometry.location;
          return {
            latitude: location.lat,
            longitude: location.lng,
          };
        })
      );
      setCoordinates(coords);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Utility function to fetch the route between the cities
  const fetchRoute = async (coords) => {
    if (coords.length < 2) return;

    const origin = `${coords[0].latitude},${coords[0].longitude}`;
    const destination = `${coords[coords.length - 1].latitude},${
      coords[coords.length - 1].longitude
    }`;
    const waypoints = coords
      .slice(1, coords.length - 1)
      .map((coord) => `${coord.latitude},${coord.longitude}`)
      .join("|");

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${GOOGLE_MAPS_APIKEY}`
      );

      if (response.data.status !== "OK") {
        console.error(
          "Error fetching route:",
          response.data.error_message || response.data.status
        );
        return;
      }

      const route = response.data.routes[0];
      if (route && route.overview_polyline) {
        const points = decodePolyline(route.overview_polyline.points);
        setRouteCoordinates(points);
      } else {
        console.error("No routes found.");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Function to decode polyline
  const decodePolyline = (t, e = 5) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;
    const factor = Math.pow(10, e);

    while (index < t.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / factor,
        longitude: lng / factor,
      });
    }
    return points;
  };

  useEffect(() => {
    if (citynames.length > 0) {
      getCoordinatesFromCityNames();
    }
  }, [citynames]);

  useEffect(() => {
    if (coordinates.length === citynames.length) {
      fetchRoute(coordinates);
    }
  }, [coordinates]);

  return {
    coordinates,
    routeCoordinates,
  };
};
