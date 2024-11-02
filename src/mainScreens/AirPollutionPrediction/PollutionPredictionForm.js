import React, { useState } from "react";
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
  Dimensions
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import axios from "axios";
import TextInputWithLabel from "../components/TextInputWithLabel";
import Header from "../components/Header";
import SubmitButton from "../components/SubmitButton";

const { width } = Dimensions.get("screen");


const PollutionPredictionForm = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [conpass, setconpass] = useState("");
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Farmer', value: 'Farmer' },
    { label: 'Researcher', value: 'Researcher' }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = React.useState("");

  const data = [{ key: '1', value: 'Jammu & Kashmir' }];

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
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

    if (address.trim() === "") {
      errorMessage = "Address is required. ";
      isValid = false;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      errorMessage = "Mobile number should be a 10-digit number. ";
      isValid = false;
    }

    if (type.trim() === "") {
      errorMessage = "Type is required. ";
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

    setError(errorMessage);
    return isValid;
  };

  const handleSubmit = async () => {
    navigation.navigate("PollutionDetails");

    // let newUser = {
    //   firstname: firstName,
    //   lastname: lastName,
    //   password,
    //   address,
    //   type,
    //   mobile,
    //   conpass
    // };
    // try {
    //   setError("");
    //   if (!validateForm())
    //     return;
    //   const loginRes = await axios.post(
    //     constants.backend_url + "/user/add",
    //     newUser
    //   );
    //   console.log(loginRes)
    //   if (loginRes.data.msg === "Successfull") {
    //     navigation.navigate("LoginScreen")
    //   }
    //   else
    //     setError(loginRes.data.msg ? loginRes.data.msg : loginRes.data.warn)

    // } catch (err) {
    //   setError(err.response.data.msg)
    // }
  }




  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Prediction"} />
        <TextInputWithLabel
          placeholder="First Name"
          iconName="user"
          value={firstName}
          onChangeText={setFirstName}
          secureTextEntry={false}
        />
        <TextInputWithLabel
          placeholder="Last Name"
          iconName="user"
          value={lastName}
          onChangeText={setLastName}
          secureTextEntry={false}
        />
        <TextInputWithLabel
          placeholder="Type"
          iconName="book"
          value={type}
          onChangeText={setType}
          secureTextEntry={false}
        />
        <TextInputWithLabel
          placeholder="Mobile"
          iconName="phone"
          value={mobile}
          onChangeText={setMobile}
          secureTextEntry={false}
        />
        <TextInputWithLabel
          placeholder="Address"
          iconName="home"
          value={address}
          onChangeText={setAddress}
          secureTextEntry={false}
        />
        <TextInputWithLabel
          placeholder="Password"
          iconName="lock"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInputWithLabel
          placeholder="Confirm Password"
          iconName="lock"
          value={conpass}
          onChangeText={setconpass}
          secureTextEntry={true}
        />
        <SubmitButton onSubmit={() => { handleSubmit() }} title={"Submit"} isLoading={isLoading} />
      </ScrollView>
    </View>
  );
};

export default PollutionPredictionForm;

const style = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: "20%",
    paddingBottom: "10%"
  },
});
