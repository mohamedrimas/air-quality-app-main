import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import constants from "../consts/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonTextInput from "./components/CommonTextInput";

const { width } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (password.length < 6) {
      errorMessage = "Password should be at least 6 characters long";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobile)) {
      errorMessage = "Please enter a valid email address";
      isValid = false;
    }
    setError(errorMessage);
    return isValid;
  };

  //*** login submit method***//
  const onSubmit = async () => {
    try {
      setError("");
      if (!validateForm()) return;
      const loginRes = await axios.post(
        constants.backend_url + "/users/login",
        {
          email: mobile,
          password,
        }
      );
      if (loginRes.data.token) {
        storeUserData(loginRes.data.token, loginRes.data.user);
        navigation.navigate("Home");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  //*** get user details for store method***//
  const storeUserData = async (token, allData) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", JSON.stringify(allData._id));
      await AsyncStorage.setItem("userData", JSON.stringify(allData));
    } catch (error) {
      Alert.alert("Alert", "Something went wrong when login!", [
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
      <View style={style.imageContainer}>
        <Image source={require("../assets/atmo.png")} />
      </View>
      <Text
        style={{
          marginTop: -10,
          fontSize: 30,
          alignSelf: "center",
          color: COLORS.secondary,
        }}
      >
        DETECT IT EARLY
      </Text>

      <View>
        <Text
          style={{
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 1,
            opacity: 0.8,
            color: COLORS.secondary,
          }}
        >
          Welcome to the app
        </Text>
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
      </View>

      <ScrollView>
        <CommonTextInput
          placeholder="Email"
          iconName="mail"
          value={mobile}
          onChangeText={setMobile}
          secureTextEntry={false}
        />
        <CommonTextInput
          placeholder="Password"
          iconName="lock"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={onSubmit}>
          <View style={style.loginButton}>
            <Text style={style.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate("SignUpScreen")}
          style={{
            alignSelf: "center",
            opacity: 0.8,
            color: COLORS.secondary,
            paddingVertical: 30,
          }}
        >
          New User
        </Text>
      </ScrollView>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  mailView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.lightBlue,
    borderRadius: 40,
    paddingVertical: 2,
  },
  passwordView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: COLORS.lightBlue,
    borderRadius: 40,
    paddingVertical: 2,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: COLORS.pink,
    paddingVertical: 15,
    borderRadius: 40,
    marginHorizontal: 55,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  paragrapgh: {
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "20%",
  },
});
