import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";

const AirPollutionHistoryCard = ({
  city,
  latitude,
  longitude,
  timestamp,
  inputs,
  prediction,
}) => {
  console.log("\n\n====");
  console.log(prediction);
  console.log("====\n\n");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{city}</Text>
      <Text style={styles.normalText}>Latitude: {latitude}</Text>
      <Text style={styles.normalText}>Longitude: {longitude}</Text>
      <Text style={styles.normalText}>
        Timestamp: {new Date(timestamp).toLocaleString()}
      </Text>
      <Text style={styles.normalText}>NO2: {inputs.no2[0]}</Text>
      <Text style={styles.normalText}>CO2: {inputs.so2[0]}</Text>
      <Text style={styles.normalText}>CH4: {inputs.o3[0]}</Text>
      {/* <Text style={styles.normalText}>CO: {inputs.co[0]}</Text> */}
      <Text style={styles.normalText}>
        PM10 Prediction: {prediction.pm_10[0]}
      </Text>
      <Text style={styles.normalText}>
        PM2.5 Prediction:{" "}
        {prediction.pm_2_5.length ? prediction.pm_2_5[0] : "N/A"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 40,
    overflow: "hidden",
    margin: 10,
    backgroundColor: COLORS.backgroundColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 30,
    padding: 20,
  },
  title: {
    color: COLORS.darkGreen,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  normalText: {
    color: COLORS.darkGreen,
    fontSize: 15,
    marginBottom: 4,
  },
});

export default AirPollutionHistoryCard;
