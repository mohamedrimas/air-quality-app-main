import React, { useState, useEffect } from "react";
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
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import axios from "axios";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Header from "../components/Header";
import SubmitButton from "../components/SubmitButton";
import AirPollutionResultCard from "../components/AirPollutionResultCard";

const { width } = Dimensions.get("screen");

const PredictAirPollution = ({ navigation }) => {
  const [co2Level, setCo2Level] = useState("");
  const [o2Level, setO2Level] = useState("");
  const [so2Level, setSo2Level] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (co2Level.trim() === "") {
      errorMessage = "Co2 Level is required. ";
      isValid = false;
    }

    if (o2Level.trim() === "") {
      errorMessage = "O2 Level is required. ";
      isValid = false;
    }

    if (so2Level.trim() === "") {
      errorMessage = "SO2 Level is required. ";
      isValid = false;
    }
    setError(errorMessage);
    return isValid;
  };

  useEffect(() => {
    (async () => {
      // Request permissions to access the location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      // Extract longitude and latitude
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  const handleShowHistory = async () => {
    navigation.navigate("PredictAirPollutionHistory");
  };
  //  "userId":"66cad62b084a2c88ced066b0"

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return null;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;

    return { latitude, longitude };
  };

  const handleSubmit = async () => {
    setError(null);
    // if (!validateForm())
    //   return;
    setIsLoading(true);
    const getUserId = await AsyncStorage.getItem("userId");
    const { latitude, longitude } = await getCurrentLocation();
    const userId = JSON.parse(getUserId);
    const data = {
      latitude,
      longitude,
      userId,
    };
    console.log("\n\n=====");
    console.log(data);
    console.log("=====\n\n");

    console.log(constants.backend_url + "/prediction/predict-air-pollution");

    try {
      setMessage(null);
      const response = await axios.post(
        constants.backend_url + "/prediction/predict-air-pollution",
        data
      );
      console.log(response.data);
      setResult(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error PredictAirPollution: ", error);
      setMessage("No IoT Reading found in current location.");
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Predict Air Pollution"} />
        {/* <KeyboardAvoidingView>
          <TextInputWithLabel
            label="CO2 Level"
            iconName="user"
            value={co2Level}
            onChangeText={setCo2Level}
            secureTextEntry={false}
          />
          <TextInputWithLabel
            label="O3 Level"
            iconName="user"
            value={o2Level}
            onChangeText={setO2Level}
            secureTextEntry={false}
          />
          <TextInputWithLabel
            label="SO2 Level"
            iconName="user"
            value={so2Level}
            onChangeText={setSo2Level}
            secureTextEntry={false}
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
              marginBottom: "5%",
              color: "#880000",
            }}
          >
            {error}
          </Text>
        </KeyboardAvoidingView> */}

        <View style={{ marginTop: 10 }}>
          <SubmitButton
            onSubmit={() => {
              handleSubmit();
            }}
            title={"Check"}
            isLoading={isLoading}
          />
        </View>
        {(result || message) && !isLoading && (
          <View>
            <AirPollutionResultCard result={result} message={message} />
          </View>
        )}
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              handleShowHistory();
            }}
            style={{ marginBottom: 35 }}
          >
            <Text
              style={{
                color: COLORS.lightBlue,
                fontSize: 18,
              }}
            >
              Show History
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PredictAirPollution;

const style = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "10%",
  },
});
