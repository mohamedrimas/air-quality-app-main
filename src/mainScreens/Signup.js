import React, { useState, useMemo } from "react";
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
import COLORS from "../consts/colors";
import constants from "../consts/constants";
import axios from "axios";
import CommonTextInput from "./components/CommonTextInput";
import RadioGroup from "react-native-radio-buttons-group";
import { useNotification } from "../../context/NotificationContext";

const { width } = Dimensions.get("screen");

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setconpass] = useState("");
  const [selectedIdAz, setSelectedIdAz] = useState(null);
  const [selectedIdWz, setSelectedIdWz] = useState(null);

  const {
    expoPushToken,
    notification,
    error: pushNotificationError,
  } = useNotification();

  const [selectedIdCOPD, setSelectedIdCOPD] = useState(null);
  const [selectedBron, setSelectedBron] = useState(null);
  const [selectedLanCan, setSelectedLanCan] = useState(null);
  const [selectedHeart, setDSelectedHeart] = useState(null);

  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Farmer", value: "Farmer" },
    { label: "Researcher", value: "Researcher" },
  ]);

  const data = [{ key: "1", value: "Jammu & Kashmir" }];

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (password !== conpass) {
      errorMessage = "Passwords do not match. ";
      isValid = false;
    }

    if (password.length < 6) {
      errorMessage = "Password should be at least 6 characters long. ";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMessage = "Please enter a valid email address";
      isValid = false;
    }

    if (userName.trim() === "") {
      errorMessage = "User Name is required. ";
      isValid = false;
    }

    if (lastName.trim() === "") {
      errorMessage = "Last Name is required. ";
      isValid = false;
    }

    if (firstName.trim() === "") {
      errorMessage = "First Name is required. ";
      isValid = false;
    }

    if (
      selectedIdAz === null ||
      selectedIdCOPD === null ||
      selectedBron === null ||
      selectedLanCan === null ||
      selectedHeart === null
    ) {
      errorMessage = "Please fill all the fields";
      isValid = false;
    }

    setError(errorMessage);
    return isValid;
  };

  //*** signup on submit method***//
  const onSubmit = async () => {
    let newUser = {
      firstname: firstName,
      lastname: lastName,
      username: userName,
      password,
      email,
      Asthma: selectedIdAz === "1" ? true : false,
      COPD: selectedIdCOPD === "1" ? true : false,
      bronchitis: selectedBron === "1" ? true : false,
      lungCancer: selectedLanCan === "1" ? true : false,
      heartDisease: selectedHeart === "1" ? true : false,
      token: expoPushToken,
    };
    try {
      setError("");
      if (!validateForm()) return;
      const loginRes = await axios.post(
        constants.backend_url + "/users/register",
        newUser
      );
      if (loginRes.status === 201) {
        setError("User Created Successfully!");
        setTimeout(() => {
          navigation.navigate("LoginScreen");
        }, 3000);
      } else setError("Something went wrong!");
    } catch (err) {
      setError("Something went wrong!");
    }
  };
  const radioButtonsData = useMemo(
    () => [
      {
        id: "1",
        label: "Yes",
        value: "yes",
        color: COLORS.lightBlue,
      },
      {
        id: "2",
        label: "No",
        value: "no",
        color: COLORS.lightBlue,
      },
    ],
    []
  );

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <View style={style.imageContainer}>
        <Image source={require("../assets/atmo.png")} />
      </View>
      <Text
        style={{
          fontSize: 30,
          alignSelf: "center",
          color: COLORS.secondary,
        }}
      >
        DETECTION FOR FUTURE
      </Text>
      <View>
        <Text
          style={{
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 5,
            opacity: 0.8,
            color: COLORS.secondary,
          }}
        >
          Welcome to our application
        </Text>
        <Text
          style={{
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 5,
            marginBottom: "5%",
            color: "#880000",
          }}
        >
          {error}
        </Text>
      </View>

      <ScrollView>
        <CommonTextInput
          placeholder="First Name"
          iconName="user"
          value={firstName}
          onChangeText={setFirstName}
          secureTextEntry={false}
        />
        <CommonTextInput
          placeholder="Last Name"
          iconName="user"
          value={lastName}
          onChangeText={setLastName}
          secureTextEntry={false}
        />
        <CommonTextInput
          placeholder="User Name"
          iconName="user"
          value={userName}
          onChangeText={setUserName}
          secureTextEntry={false}
        />
        <CommonTextInput
          placeholder="Email"
          iconName="mail"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
        />
        <CommonTextInput
          placeholder="Password"
          iconName="lock"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <CommonTextInput
          placeholder="Confirm Password"
          iconName="lock"
          value={conpass}
          onChangeText={setconpass}
          secureTextEntry={true}
        />
        <View style={style.radioInput}>
          <Text style={style.radioText}>Do you have Asthma?</Text>
          <View>
            <RadioGroup
              radioButtons={radioButtonsData}
              onPress={setSelectedIdAz}
              selectedId={selectedIdAz}
              labelStyle={{
                color: COLORS.lightBlue,
                borderColor: COLORS.lightBlue,
              }}
            />
          </View>
        </View>
        <View style={style.radioInput}>
          <Text style={style.radioText}>Do you have COPD?</Text>
          <View>
            <RadioGroup
              radioButtons={radioButtonsData}
              onPress={setSelectedIdCOPD}
              selectedId={selectedIdCOPD}
              labelStyle={{
                color: COLORS.lightBlue,
                borderColor: COLORS.lightBlue,
              }}
            />
          </View>
        </View>
        <View style={style.radioInput}>
          <Text style={style.radioText}>Do you have Bronchitis?</Text>
          <View>
            <RadioGroup
              radioButtons={radioButtonsData}
              onPress={setSelectedBron}
              selectedId={selectedBron}
              labelStyle={{
                color: COLORS.lightBlue,
                borderColor: COLORS.lightBlue,
              }}
            />
          </View>
        </View>
        <View style={style.radioInput}>
          <Text style={style.radioText}>Do you have Lung Cancer?</Text>
          <View>
            <RadioGroup
              radioButtons={radioButtonsData}
              onPress={setSelectedLanCan}
              selectedId={selectedLanCan}
              labelStyle={{
                color: COLORS.lightBlue,
                borderColor: COLORS.lightBlue,
              }}
            />
          </View>
        </View>
        <View style={style.radioInput}>
          <Text style={style.radioText}>Do you have Heart Disease?</Text>
          <View>
            <RadioGroup
              radioButtons={radioButtonsData}
              onPress={setDSelectedHeart}
              selectedId={selectedHeart}
              labelStyle={{
                color: COLORS.lightBlue,
                borderColor: COLORS.lightBlue,
              }}
            />
          </View>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <View style={style.regButton}>
            <Text
              style={{
                color: "white",
              }}
            >
              Register
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate("LoginScreen")}
          style={{
            alignSelf: "center",
            color: COLORS.secondary,
            paddingVertical: 30,
            paddingVertical: 30,
            marginBottom: "15%",
          }}
        >
          Already have an account
        </Text>
      </ScrollView>
    </View>
  );
};

export default Register;

const style = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 10,
    paddingVertical: 2,
  },
  inputViewDrop: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 45,
    borderWidth: 0,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 10,
    paddingVertical: 2,
  },
  regButton: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: COLORS.pink,
    paddingVertical: 15,
    borderRadius: 40,
  },
  mail: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 10,
    paddingVertical: 2,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "10%",
  },
  radioInput: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 55,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  radioText: {
    paddingHorizontal: 10,
    height: 45,
    fontSize: 20,
    color: COLORS.lightBlue,
    flex: 1,
  },
});
