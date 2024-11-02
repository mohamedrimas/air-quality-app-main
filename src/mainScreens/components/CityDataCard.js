import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import COLORS from "../../consts/colors";
import { getAirQualityInterpretation } from "../../utils/Util";
const { width } = Dimensions.get("screen");

const QualityText = ({ interpretation }) => {
  return (
    <Text
      style={[
        styles.muted,
        {
          color:
            interpretation === "Good"
              ? "green"
              : interpretation === "Moderate"
              ? "yellow"
              : interpretation === "Hazardous"
              ? "red"
              : "black",
        },
      ]}
    >
      {" "}
      ({interpretation})
    </Text>
  );
};

const CityDataCard = ({ selectedCityData }) => {
  const renderItem = (item) => {
    const formattedDate = new Date(item.timestamp).toLocaleString();

    const diseases = [];
    if (item.copdStat) diseases.push("COPD");
    if (item.asthmaStat) diseases.push("Asthma");
    if (item.bronchitisStat) diseases.push("Bronchitis");
    if (item.lungCancerStat) diseases.push("Lung Cancer");

    const interpretations = getAirQualityInterpretation(
      item.averageSO2Level,
      item.averageNO2Level,
      0,
      item.averageCO2Level
    );

    console.log("\n\n\n=========interpretations");
    console.log(interpretations.so2.interpretation);

    return (
      <View style={styles.card} key={item._id}>
        {/* <Text style={styles.title}>{item.city}</Text> */}
        <Text style={styles.info}>Time: {formattedDate}</Text>
        <Text style={styles.info}>
          Average CO2 Level: {item.averageCO2Level?.toFixed(2)} ppm
          <QualityText interpretation={interpretations.co2.interpretation} />
        </Text>
        <Text style={styles.info}>
          Average NO2 Level: {item.averageNO2Level?.toFixed(2)} ppm
          <QualityText interpretation={interpretations.no2.interpretation} />
        </Text>
        <Text style={styles.info}>
          Average CH4 Level: {item.averageCH4Level.toFixed(2)} ppm
        </Text>
        {diseases.length > 0 && (
          <Text style={styles.diseaseInfo}>
            Diseases: {diseases.join(", ")}
          </Text>
        )}
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
    width: "auto",
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
  muted: {
    fontSize: 16,
    color: "#666",
  },
});

export default CityDataCard;
