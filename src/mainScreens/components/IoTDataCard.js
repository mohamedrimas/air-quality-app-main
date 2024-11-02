import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");

const IoTDataCard = ({ selectedCityData }) => {
  const renderItem = (item) => {
    const formattedDate = new Date(item.timestamp).toLocaleString();

    return (
      <View style={styles.card} key={item._id}>
        {/* <Text style={styles.title}>{item.city}</Text> */}
        <Text style={styles.info}>Time: {formattedDate}</Text>
        <Text style={styles.info}>
          CO2 Level: {item.co2Level?.toFixed(2)} ppm
        </Text>
        <Text style={styles.info}>
          NO2 Level: {item.no2Level?.toFixed(2)} ppm
        </Text>
        <Text style={styles.info}>
          CH4 Level: {item.ch4Level.toFixed(2)} ppm
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>{selectedCityData.map(renderItem)}</View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.backgroundColor,
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: width / 1.1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.darkGreen,
  },
  info: {
    fontSize: 18,
    marginBottom: 3,
    color: COLORS.darkGreen,
  },
  diseaseInfo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: COLORS.darkGreen,
  },
});

export default IoTDataCard;
