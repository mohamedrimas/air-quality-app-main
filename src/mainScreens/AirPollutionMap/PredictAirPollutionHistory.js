import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Picker,
  Platform,
  Button,
  Dimensions,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import axios from "axios";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Header from "../components/Header";
import SubmitButton from "../components/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AirPollutionHistoryCard from "../components/AirPollutionHistoryCard";

const { width } = Dimensions.get("screen");

const PredictAirPollutionHistory = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShowHistory = async () => {
    // navigation.navigate("OptimalTimeTravelResult");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserId = await AsyncStorage.getItem("userId");
        const userId = JSON.parse(getUserId);
        const response = await axios.get(
          constants.backend_url +
            "/prediction/air-pollution-predictions/" +
            userId
        );
        console.log(
          constants.backend_url +
            "/prediction/air-pollution-predictions/" +
            userId
        );

        setResult(response.data);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Air Pollution History"} />
        {result?.map((item) => (
          <AirPollutionHistoryCard
            key={item._id}
            city={item.city}
            latitude={item.latitude}
            longitude={item.longitude}
            timestamp={item.timestamp}
            inputs={item.inputs}
            prediction={item.prediction}
          />
        ))}
        {/* <TextInputWithLabel
          label="CO2 Level"
          iconName="user"
          value={co2Level}
          onChangeText={setCo2Level}
          secureTextEntry={false}
        />
        <TextInputWithLabel
          label="O2 Level"
          iconName="user"
          value={o2Level}
          onChangeText={setO2Level}
          secureTextEntry={false}
        />
        <SubmitButton onSubmit={() => { handleSubmit() }} title={"Check"} isLoading={isLoading} /> */}
      </ScrollView>
    </View>
  );
};

export default PredictAirPollutionHistory;

const style = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "10%",
  },
});
