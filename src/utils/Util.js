export function getAirQualityInterpretation(so2 = 0, no2 = 0, co = 0, co2 = 0) {
  function interpret(ppm, ranges) {
    for (const range of ranges) {
      if (ppm >= range.min && ppm <= range.max) {
        return {
          description: range.description,
          interpretation: range.interpretation,
          colorCode: range.colorCode,
        };
      }
    }
    // Handle cases where the value is greater than the maximum range
    const lastRange = ranges[ranges.length - 1];
    return {
      description: lastRange.description,
      interpretation: lastRange.interpretation,
      colorCode: lastRange.colorCode,
    };
  }

  const so2Ranges = [
    {
      min: 0,
      max: 0.015,
      description: "Air pollution is little or no risk",
      interpretation: "Good",
      colorCode: "Green",
    },
    {
      min: 0.016,
      max: 0.048,
      description: "Everyone may begin to affect health effects",
      interpretation: "Moderate",
      colorCode: "Yellow",
    },
    {
      min: 0.049,
      max: Infinity,
      description: "Everyone may be affected by serious health effects",
      interpretation: "Hazardous",
      colorCode: "Red",
    },
  ];

  const no2Ranges = [
    {
      min: 0,
      max: 0.013,
      description: "Air pollution is little or no risk",
      interpretation: "Good",
      colorCode: "Green",
    },
    {
      min: 0.014,
      max: 0.087,
      description: "Everyone may begin to affect health effects",
      interpretation: "Moderate",
      colorCode: "Yellow",
    },
    {
      min: 0.088,
      max: Infinity,
      description: "Everyone may be affected by serious health effects",
      interpretation: "Hazardous",
      colorCode: "Red",
    },
  ];

  const coRanges = [
    {
      min: 0,
      max: 3.5,
      description: "Air pollution is little or no risk",
      interpretation: "Good",
      colorCode: "Green",
    },
    {
      min: 3.51,
      max: 25.29,
      description: "Everyone may begin to affect health effects",
      interpretation: "Moderate",
      colorCode: "Yellow",
    },
    {
      min: 25.3,
      max: Infinity,
      description: "Everyone may be affected by serious health effects",
      interpretation: "Hazardous",
      colorCode: "Red",
    },
  ];

  const co2Ranges = [
    {
      min: 0,
      max: 1000,
      description: "Air pollution is little or no risk",
      interpretation: "Good",
      colorCode: "Green",
    },
    {
      min: 1001,
      max: 5000,
      description: "Everyone may begin to affect health effects",
      interpretation: "Moderate",
      colorCode: "Yellow",
    },
    {
      min: 5001,
      max: Infinity,
      description: "Everyone may be affected by serious health effects",
      interpretation: "Hazardous",
      colorCode: "Red",
    },
  ];

  const so2Interpretation = interpret(so2, so2Ranges);
  const no2Interpretation = interpret(no2, no2Ranges);
  const coInterpretation = interpret(co, coRanges);
  const co2Interpretation = interpret(co2, co2Ranges);

  let areaColor = "#ff453a80";
  let insights = {};

  if (
    so2Interpretation.colorCode === "Red" ||
    no2Interpretation.colorCode === "Red" ||
    co2Interpretation.colorCode === "Red"
  ) {
    areaColor = "#FF0000"; // High risk - Red
    insights = {
      riskLevel: "High Risk (Unhealthy Air Quality)",
      message:
        "Air quality is unhealthy today. Everyone, especially sensitive groups, should limit outdoor activities.",
      educationalInsight:
        "Prolonged exposure to high pollution levels can exacerbate respiratory issues, leading to increased symptoms or flare-ups. Protect yourself by reducing outdoor exposure.",
      precaution:
        "Stay indoors with windows closed as much as possible. Use an air purifier if available and avoid outdoor exercise. Wear an N95 mask if you need to go outside.",
    };
  } else if (
    so2Interpretation.colorCode === "Yellow" ||
    no2Interpretation.colorCode === "Yellow" ||
    co2Interpretation.colorCode === "Yellow"
  ) {
    areaColor = "#FFC000"; // Moderate risk - Yellow
    insights = {
      riskLevel: "Moderate Risk (Moderate Air Quality)",
      message:
        "Air quality is moderate today. Sensitive groups, such as those with asthma or COPD, should reduce prolonged outdoor exertion.",
      educationalInsight:
        "People with respiratory conditions might experience mild symptoms such as coughing or shortness of breath. Keep track of your symptoms and avoid triggers.",
      precaution:
        "If you're sensitive to air pollution, consider staying indoors during peak pollution hours or wearing a mask when outside.",
    };
  } else if (
    so2Interpretation.colorCode === "Green" ||
    no2Interpretation.colorCode === "Green" ||
    co2Interpretation.colorCode === "Green"
  ) {
    areaColor = "#98FB98"; // Low risk - Green
    insights = {
      riskLevel: "Low Risk (Good Air Quality)",
      message:
        "Air quality is good today! You can enjoy outdoor activities without any concerns.",
      educationalInsight:
        "Breathing clean air supports overall health and well-being. Keep an eye on air quality to continue protecting your lungs.",
      precaution:
        "No specific precautions are needed, but maintaining a healthy lifestyle with regular exercise and a balanced diet is always beneficial.",
    };
  } else {
    areaColor = "#ff453a80"; // Default
    insights = {
      riskLevel: "Critical Risk (Hazardous Air Quality)",
      message:
        "Air quality is hazardous today. Everyone should avoid outdoor activities.",
      educationalInsight:
        "At hazardous levels, air pollution can cause serious health effects, including respiratory and cardiovascular issues. It's essential to minimize exposure.",
      precaution:
        "Stay indoors with air purification if possible. Seal windows and doors to prevent outdoor air from entering. Avoid any physical exertion outdoors. Seek medical advice if you experience any symptoms.",
    };
  }

  return {
    so2: so2Interpretation,
    no2: no2Interpretation,
    co: coInterpretation,
    co2: co2Interpretation,
    areaColor: areaColor,
    insights: insights,
  };
}

export const getAQICategory = (pm25Value) => {
  if (pm25Value >= 0 && pm25Value <= 30) {
    return {
      quality: "AQI Category 1 (Good)",
      message:
        "Great news! The air quality is expected to be good today. Feel free to plan outdoor activities.",
      insight:
        "Encourage maintaining regular outdoor routines for a healthy lifestyle.",
    };
  } else if (pm25Value >= 31 && pm25Value <= 60) {
    return {
      quality: "AQI Category 2 (Satisfactory)",
      message:
        "The air quality is expected to be good today. Feel free to plan outdoor activities.",
      insight:
        "Encourage maintaining regular outdoor routines for a healthy lifestyle.",
    };
  } else if (pm25Value >= 61 && pm25Value <= 90) {
    return {
      quality: "AQI Category 3 (Moderate)",
      message:
        "The air quality is expected to be moderate. Consider limiting outdoor activities if you have respiratory conditions.",
      insight: "Suggest moderate adjustments, especially for sensitive users",
    };
  } else if (pm25Value >= 91 && pm25Value <= 120) {
    return {
      quality: "AQI Category 4 (Poor)",
      message:
        "Air quality is predicted to be unhealthy. It’s a good idea to limit outdoor activities and stay indoors",
      insight:
        "Recommend precautions like avoiding outdoor exercise and using masks.",
    };
  } else if (pm25Value >= 121 && pm25Value <= 250) {
    return {
      quality: "AQI Category 5 (Very Poor)",
      message:
        "Air quality is expected to reach hazardous levels. Stay indoors and minimize exposure.",
      insight:
        "Strongly advise avoiding outdoor activities and focus on keeping indoor air clean.",
    };
  } else if (pm25Value > 250) {
    return {
      quality: "AQI Category 6 (Severe)",
      message:
        "Air quality is expected to reach hazardous levels. Stay indoors and minimize exposure.",
      insight:
        "Strongly advise avoiding outdoor activities and focus on keeping indoor air clean.",
    };
  } else {
    return "Invalid PM2.5 value";
  }
};

export function getHoursByDate(timeStamps, uniqueDates) {
  const dateHours = {};

  uniqueDates.forEach((date) => {
    dateHours[date] = [];
  });

  timeStamps.forEach((timestamp) => {
    const [date, time] = timestamp.split("T");
    const hour = parseInt(time.split(":")[0], 10); // Extract the hour as an integer
    if (dateHours[date]) {
      dateHours[date].push(`${hour}h`); // Format hour as a string with "h"
    }
  });

  return Object.values(dateHours);
}

// export function getAirQualityInterpretation(so2 = 0, no2 = 0, co = 0, co2 = 0) {
//     function interpret(ppm, ranges) {
//         for (const range of ranges) {
//             if (ppm >= range.min && ppm <= range.max) {
//                 return {
//                     description: range.description,
//                     interpretation: range.interpretation,
//                     colorCode: range.colorCode
//                 };
//             }
//         }
//         // Handle cases where the value is greater than the maximum range
//         const lastRange = ranges[ranges.length - 1];
//         return {
//             description: lastRange.description,
//             interpretation: lastRange.interpretation,
//             colorCode: lastRange.colorCode
//         };
//     }

//     const so2Ranges = [
//         { min: 0, max: 0.015, description: "Air pollution is little or no risk", interpretation: "Good", colorCode: "Green" },
//         { min: 0.016, max: 0.048, description: "Everyone may begin to affect health effects", interpretation: "Moderate", colorCode: "Yellow" },
//         { min: 0.049, max: Infinity, description: "Everyone may be affected by serious health effects", interpretation: "Hazardous", colorCode: "Red" }
//     ];

//     const no2Ranges = [
//         { min: 0, max: 0.013, description: "Air pollution is little or no risk", interpretation: "Good", colorCode: "Green" },
//         { min: 0.014, max: 0.087, description: "Everyone may begin to affect health effects", interpretation: "Moderate", colorCode: "Yellow" },
//         { min: 0.088, max: Infinity, description: "Everyone may be affected by serious health effects", interpretation: "Hazardous", colorCode: "Red" }
//     ];

//     const coRanges = [
//         { min: 0, max: 3.50, description: "Air pollution is little or no risk", interpretation: "Good", colorCode: "Green" },
//         { min: 3.51, max: 25.29, description: "Everyone may begin to affect health effects", interpretation: "Moderate", colorCode: "Yellow" },
//         { min: 25.30, max: Infinity, description: "Everyone may be affected by serious health effects", interpretation: "Hazardous", colorCode: "Red" }
//     ];

//     const co2Ranges = [
//         { min: 0, max: 1000, description: "Air pollution is little or no risk", interpretation: "Good", colorCode: "Green" },
//         { min: 1001, max: 5000, description: "Everyone may begin to affect health effects", interpretation: "Moderate", colorCode: "Yellow" },
//         { min: 5001, max: Infinity, description: "Everyone may be affected by serious health effects", interpretation: "Hazardous", colorCode: "Red" }
//     ];

//     let areaColor = "rgba(255, 69, 58, 0.5)";
//     if (so2 > 0.088 || no2 > 0.049 || co2 > 5001)
//         areaColor = "#FF0000"
//     if ((so2 > 0.016 && so2 <= 0.048) || (no2 > 0.014 && no2 <= 0.087) || (co2 > 1001 && co2 <= 5000))
//         areaColor = "#FFC000";
//     if ((so2 > 0 && so2 <= 0.015) || (no2 > 0 && no2 <= 0.013) || (co2 > 0 && co2 <= 1000))
//         areaColor = "#98FB98"

//     return {
//         so2: interpret(so2, so2Ranges),
//         no2: interpret(no2, no2Ranges),
//         co: interpret(co, coRanges),
//         co2: interpret(co2, co2Ranges),
//         areaColor: areaColor,
//     };
// }

export const extractCitiesAndDistance = (route) => {
  const cityNames = [];
  let totalDistance = 0;

  route.legs.forEach((leg) => {
    leg.steps.forEach((step) => {
      if (step.distance && step.distance.value) {
        totalDistance += step.distance.value;
      }

      // Extract city names from step's instructions
      const instruction = step.html_instructions;

      // Define regex pattern to capture city names (based on patterns you observe)
      const cityPattern = /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g;

      // Extract potential city names
      const matches = instruction.match(cityPattern);

      // If matches found, filter out common non-city words
      if (matches) {
        matches.forEach((match) => {
          // Add more conditions here based on your data to filter out irrelevant words
          if (
            ![
              "Head",
              "Turn",
              "Continue",
              "Pass",
              "Merge",
              "At",
              "Slight",
              "Destination",
              "Restricted",
              "Keep",
              "Exit",
            ].includes(match)
          ) {
            if (!cityNames.includes(match)) {
              cityNames.push(match);
            }
          }
        });
      }
    });
  });

  // Convert total distance from meters to kilometers
  totalDistance = totalDistance / 1000;

  return [...cityNames, totalDistance];
};

export const formatRoutes = (routes) => {
  return routes.map((route) => {
    const cities = route.legs[0].steps.map((step) =>
      step.html_instructions.replace(/<[^>]+>/g, "")
    );
    const lastCity = cities[cities.length - 1];
    const distance = route.legs[0].distance.value / 1000; // Convert meters to kilometers
    return [...cities, lastCity, distance];
  });
};

export const processRoutes = (routes) => {
  return routes.map((route) => extractCitiesAndDistance(route));
};
