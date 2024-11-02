import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import COLORS from "../../consts/colors";

const { width } = Dimensions.get("screen");

const AirPollutionEducationalScreen = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Air Pollution Insights"} />
        <View style={style.container}>
          {/* Risk Level Section */}
          <View style={style.section}>
            <Text style={style.riskTitle}>Risk Level</Text>
            <Text style={style.riskLevel}>{data.riskLevel}</Text>
          </View>

          {/* Message Section */}
          <View style={style.section}>
            <Text style={style.boldText}>Message</Text>
            <Text style={style.messageText}>{data.message}</Text>
          </View>

          {/* Educational Insight Section */}
          <View style={style.section}>
            <Text style={style.boldText}>Educational Insight</Text>
            <Text style={style.insightText}>{data.educationalInsight}</Text>
          </View>

          {/* Precaution Section */}
          <View style={style.section}>
            <Text style={style.boldText}>Precaution</Text>
            <Text style={style.precautionText}>{data.precaution}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AirPollutionEducationalScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 50,
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
  },
  riskTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    textAlign: "center",
    marginBottom: 10,
  },
  riskLevel: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: COLORS.darkGreen,
    textAlign: "justify",
  },
  insightText: {
    fontSize: 16,
    color: "#666",
    textAlign: "justify",
  },
  precautionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
  },
});
