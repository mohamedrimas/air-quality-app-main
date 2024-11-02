import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";
import { getAQICategory } from "../../utils/Util";

const AirPollutionResultCard = ({ result, message }) => {
  console.log("AirPollutionResultCard");
  console.log(result);

  const pm25 = result?.prediction["pm_2_5"][0];
  const pm10 = result?.prediction["pm_10"][0];
  const coValue = result?.predictionInputs.inputs.co[0];
  const no2Value = result?.predictionInputs.inputs.no2[0];
  const o3Value = result?.predictionInputs.inputs.o3[0];
  const so2Value = result?.predictionInputs.inputs.so2[0];

  //no2, so2->co2, o3->ch4,

  const eduData = getAQICategory(pm25);
  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.topTitle}>Result</Text>
      </View>
      {message ? (
        <View style={styles.content}>
          <Text style={styles.messageTitle}>{message}</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.dataRow}>
            <Text style={styles.boldText}>PM2.5: </Text>
            <Text style={styles.modalText}>{pm25}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.boldText}>PM10.5: </Text>
            <Text style={styles.modalText}>{pm10}</Text>
          </View>
          {/* air values */}
          {/* <View style={styles.dataRow}>
            <Text style={styles.boldText}>CO: </Text>
            <Text style={styles.modalText}>{coValue}</Text>
          </View> */}
          <View style={styles.dataRow}>
            <Text style={styles.boldText}>NO2: </Text>
            <Text style={styles.modalText}>{no2Value}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.boldText}>CH4: </Text>
            <Text style={styles.modalText}>{o3Value}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.boldText}>CO2: </Text>
            <Text style={styles.modalText}>{so2Value}</Text>
          </View>
          {/* end air values */}
          <Text style={styles.mutedText}>{eduData?.quality}</Text>
          <View style={styles.section}>
            <Text style={styles.modalText2}>{eduData?.message}</Text>
            <Text style={styles.modalText2}>{eduData?.insight}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    marginBottom: 10,
  },
  precautionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.darkGreen,
  },
  messageTitle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
    color: COLORS.darkGreen,
  },
  topTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 10,
    color: COLORS.darkGreen,
  },
  description: {
    fontSize: 20,
    marginBottom: 5,
    color: COLORS.darkGreen,
  },
  muted: {
    fontSize: 20,
    color: "#666",
  },
  riskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  riskText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 20,
    // marginBottom: 10,
    color: COLORS.darkGreen,
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.darkGreen,
  },
  dataRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  mutedText: {
    fontSize: 16,
    color: COLORS.indigo,
    textAlign: "center",
  },
  modalText2: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.darkGreen,
    marginBottom: 10,
  },
});

export default AirPollutionResultCard;
