import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Button,
  Dimensions,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Header from "../components/Header";
import SubmitButton from "../components/SubmitButton";
import OptimalTimeResultCard from "../components/OptimalTimeResultCard";

const { width } = Dimensions.get("screen");

const OptimalTimeTravel = ({ navigation }) => {
  const [checkUntil, setCheckUntil] = useState();
  const [result, setResult] = useState(null);

  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (mode === "date") {
      // After selecting the date, switch to the time picker
      setMode("time");
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const startDate = new Date();
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");
    const hours = String(startDate.getHours()).padStart(2, "0");
    const minutes = String(startDate.getMinutes()).padStart(2, "0");
    const seconds = String(startDate.getSeconds()).padStart(2, "0");

    const start_date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    const endYear = date.getFullYear();
    const endMonth = String(date.getMonth() + 1).padStart(2, "0");
    const endDay = String(date.getDate()).padStart(2, "0");
    const endHours = String(date.getHours()).padStart(2, "0");
    const endMinutes = String(date.getMinutes()).padStart(2, "0");
    const endSeconds = String(date.getSeconds()).padStart(2, "0");

    const end_date = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:${endSeconds}`;

    try {
      const response = await axios.post(
        constants.backend_url + "/prediction/lowest-co2-hour",
        {
          start_date,
          end_date,
        }
      );
      setIsLoading(false);
      setResult(response?.data?.prediction);
    } catch (error) {
      setIsLoading(false);
      console.log("error OptimalTimeTravel: ", error);
      Alert.alert("Alert", "Please select a valid date and time", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header
          navigation={navigation}
          title={"Predict Optimal Time for Travel"}
        />
        <View style={{ marginTop: 100 }}>
          <Text style={style.label}>Check Until</Text>
          <TouchableOpacity onPress={showDatepicker} activeOpacity={1}>
            <View style={style.inputView}>
              <Icon name="calendar" color="#00716F" size={24} />
              <TextInput
                editable={false}
                value={`${date.toISOString().split("T")[0]} ${
                  date.toTimeString().split(" ")[0]
                }`}
                placeholderTextColor="#00716F"
                style={{
                  paddingHorizontal: 10,
                  height: 45,
                  fontSize: 18,
                  color: COLORS.darkGreen,
                }}
                onChangeText={(text) => setCheckUntil(text)}
              />
              <View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <SubmitButton
          onSubmit={() => {
            handleSubmit();
          }}
          title={"Check"}
          isLoading={isLoading}
        />
        {result && !isLoading && (
          <View>
            <OptimalTimeResultCard result={result} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OptimalTimeTravel;

const style = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "10%",
  },
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
