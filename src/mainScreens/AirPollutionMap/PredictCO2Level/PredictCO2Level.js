import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import SubmitButton from "../../components/SubmitButton";
import COLORS from "../../../consts/colors";
import axios from "axios";
import constants from "../../../consts/constants";

const timeOptions = {
  timeZone: "Asia/Colombo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
  hour12: false,
};

const { width } = Dimensions.get("screen");

const PredictCO2Level = ({ navigation }) => {
  const [checkUntil, setCheckUntil] = useState();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const [nowTime, setNowTime] = useState(
    date.toLocaleString("en-US", timeOptions).split(", ")[1]
  );

  // Date change handler
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // On iOS, this hides the picker
    setDate(currentDate);
  };

  // Time change handler
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios"); // On iOS, this hides the picker
    setTime(currentTime);
    const tempTime = currentTime
      .toLocaleString("en-US", timeOptions)
      .split(", ")[1];
    console.log("tempTime: ", tempTime);

    setNowTime(tempTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);

    const startDate = new Date();
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");
    const hours = String(startDate.getHours()).padStart(2, "0");
    const minutes = String(startDate.getMinutes()).padStart(2, "0");
    const seconds = String(startDate.getSeconds()).padStart(2, "0");

    const start_date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    // Combine date and time for end_date
    const endYear = date.getFullYear();
    const endMonth = String(date.getMonth() + 1).padStart(2, "0");
    const endDay = String(date.getDate()).padStart(2, "0");
    const endHours = String(time.getHours()).padStart(2, "0");
    const endMinutes = String(time.getMinutes()).padStart(2, "0");
    const endSeconds = "00"; // Optionally, you can use time.getSeconds()

    const end_date = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:${endSeconds}`;

    console.log("Start date:", start_date);
    console.log("End date:", end_date);

    if (start_date >= end_date) {
      setIsLoading(false);
      return setError("Please select a valid date!");
    }

    try {
      const getUserId = await AsyncStorage.getItem("userId");
      const userId = JSON.parse(getUserId);
      const data = {
        start_date,
        end_date,
        userId,
      };

      const response = await axios.post(
        constants.backend_url + "/prediction/predict-co2-hour",
        data
      );
      const resultData = response?.data?.savedObj;

      if (resultData) {
        setResult(resultData);
        setIsLoading(false);
        navigation.navigate("ChartsScreen", { result: resultData });
      } else {
        setIsLoading(false);
        throw new Error("No result data found");
      }
    } catch (error) {
      console.log("error: ", error);

      setIsLoading(false);
      Alert.alert("Alert", "Something went wrong!");
    }
  };

  const handleShowHistory = async () => {
    setIsLoadingHistory(true);
    const getUserId = await AsyncStorage.getItem("userId");
    const userId = JSON.parse(getUserId);
    const response = await axios.get(
      constants.backend_url + "/prediction/co2-predictions/" + userId
    );

    if (response.data) {
      setIsLoadingHistory(false);
      navigation.navigate("PredictCO2LevelHistory", { result: response.data });
    } else {
      setIsLoadingHistory(false);
      throw new Error("No result data found");
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Predict CO2 Level"} />
        <View style={{ marginTop: 100 }}>
          <Text style={style.label}>Check Until</Text>

          <TouchableOpacity onPress={showDatepicker} activeOpacity={1}>
            <View style={style.inputView}>
              <Icon name="calendar" color="#00716F" size={24} />
              <TextInput
                editable={false}
                value={`${date.toISOString().split("T")[0]}`}
                placeholderTextColor="#00716F"
                style={{ paddingHorizontal: 10, height: 45, fontSize: 18 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showTimepicker}
            activeOpacity={1}
            style={{ marginTop: 20 }}
          >
            <View style={style.inputView}>
              <Icon name="clockcircleo" color="#00716F" size={24} />
              <TextInput
                editable={false}
                value={nowTime}
                placeholderTextColor="#00716F"
                style={{ paddingHorizontal: 10, height: 45, fontSize: 18 }}
              />
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>

        <Text
          style={{
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 3,
            color: "#880000",
          }}
        >
          {error}
        </Text>

        <SubmitButton
          onSubmit={handleSubmit}
          title={"Check"}
          isLoading={isLoading}
        />

        {isLoadingHistory ? (
          <ActivityIndicator size="small" />
        ) : (
          <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity
              onPress={handleShowHistory}
              style={{ marginBottom: 35 }}
            >
              <Text style={{ color: COLORS.lightBlue, fontSize: 18 }}>
                Show History
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PredictCO2Level;

const style = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    paddingVertical: 2,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    color: COLORS.lightBlue,
    marginHorizontal: 30,
  },
});
