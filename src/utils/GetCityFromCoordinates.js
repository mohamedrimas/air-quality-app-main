import axios from "axios";
import constants from "../consts/constants";

const googleMapsApiKey = constants.map_api_key;

export async function getCityFromCoordinates(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`;
  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results.length > 0) {
      // Find the most detailed address component that could represent a place or neighborhood
      let placeInfo = null;

      // Loop through all results
      for (const result of results) {
        // Check if the result is detailed enough (e.g., neighborhood, premise, or street address)
        placeInfo = result.address_components.find(
          (comp) =>
            comp.types.includes("neighborhood") ||
            comp.types.includes("sublocality") ||
            comp.types.includes("premise") ||
            comp.types.includes("street_address")
        );

        if (placeInfo) {
          return placeInfo.long_name; // Return the most specific place name found
        }
      }

      // Fallback to less specific types if no neighborhood or premise is found
      for (const result of results) {
        placeInfo = result.address_components.find(
          (comp) =>
            comp.types.includes("locality") ||
            comp.types.includes("administrative_area_level_3")
        );

        if (placeInfo) {
          return placeInfo.long_name;
        }
      }
    }
    return "Unknown Location";
  } catch (err) {
    console.log(err);
  } // Return default when no suitable location is found
}

// export async function getCityFromCoordinates(latitude, longitude) {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`;

//   try {
//     const response = await axios.get(url);
//     const results = response.data.results;

//     if (results.length > 0) {
//       // Loop through the results to find the city
//       for (const component of results[0].address_components) {
//         if (component.types.includes("locality")) {
//           return component.long_name; // Return the city name
//         }
//       }
//       // If no locality found, you can return another type like 'administrative_area_level_2'
//       for (const component of results[0].address_components) {
//         if (component.types.includes("administrative_area_level_2")) {
//           return component.long_name; // Return the county or district name as a fallback
//         }
//       }
//     } else {
//       throw new Error("No results found");
//     }
//   } catch (error) {
//     console.error("Error fetching city name:", error.message);
//     return null; // Handle error appropriately
//   }
// }
