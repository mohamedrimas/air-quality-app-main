import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
} from "react-native";
import COLORS from "../../consts/colors";
import SubMenuCard from "../components/SubMenuCard";
import image1 from "../../assets/sub-1.png";
import image2 from "../../assets/sub-2.png";
import Header from "../components/Header";
const { height } = Dimensions.get("screen");
const screenHeight = height;

const AirPollutionPrediction = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      <View>
        <Header navigation={navigation} title={"Air Pollution Prediction"} />
        <View>
          <Image
            style={{
              width: "100%",
              height: screenHeight / 3,
              resizeMode: "contain",
              marginVertical: 10,
            }}
            source={require("../../assets/s1.png")}
          />
          <View>
            <SubMenuCard
              icon={image2}
              navigation={navigation}
              title="Predict Pollution"
              direct={"PollutionPredictionForm"}
            />
            <SubMenuCard
              icon={image1}
              navigation={navigation}
              direct={"DiseaseHistory"}
              title="Prediction History"
              parent={"DiseaseScreen"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  cameraContainer: {
    flex: 1,
    //flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  panelButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.darkGreen,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 15,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});

export default AirPollutionPrediction;
