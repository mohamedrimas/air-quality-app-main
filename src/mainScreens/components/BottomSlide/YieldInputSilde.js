import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import constants from "../../../consts/constants";
import * as Location from "expo-location";
import ModalDropdown from "react-native-modal-dropdown";

const YieldInputSilde = ({ refRBSheet, navigation }) => {
  const [area, setArea] = useState("");
  const [iot, setIot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const onSubmit = async () => {

    if (!iot) return setError("Please enter IoT ID")

    const userId = await AsyncStorage.getItem("userId");
    let location = await Location.getCurrentPositionAsync({});
    let data = {
      area,
      IoTId: iot,
      user_Id: userId,
      lang: location.coords.latitude,
      long: location.coords.longitude,
    };
    console.log(data);
    try {
      setLoading(true);
      const res = await axios.post(
        constants.backend_url + "/detection/detect-yield",
        data
      );
      console.log(res);
      if (res) {
        setLoading(false);
        refRBSheet.current.close()
        navigation.navigate("YiledResultsScreen", {
          data: res.data,
          title: "Yield Prediction Results",
          parent: "yield",
        });
      }
      //navigation.navigate("Home");
    } catch (err) {
      setLoading(false);
      Alert.alert("Alert", "Something went wrong!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log(err);
    }
  };

  return (
    <View>
      {loading ? (
        <View>
          <Text style={{ fontSize: 22, textAlign: "center", marginTop: 55 }}>
            Loading...
          </Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={style.panel}>
          <View >
            <Text style={{
              marginHorizontal: 55,
              textAlign: "center",
              marginTop: 3,
              color: "#3247A6"
            }}>
              {error}
            </Text>
          </View>
          <View style={style.inputView}>
            <TextInput
              onChangeText={(text) => setIot(text)}
              placeholder="IoT ID"
              style={{ paddingHorizontal: 10, height: 30, fontSize: 17 }}
            />
          </View>
          <TouchableOpacity style={style.panelButton} onPress={onSubmit}>
            <Text style={style.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.panelButton}
            onPress={() => refRBSheet.current.close()}
          >
            <Text style={style.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default YieldInputSilde;

const style = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: COLORS.backgroundColor,
    paddingTop: 5,
  },

  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 22,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 7,
  },
  panelButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 15,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  panelCamIcon: {
    fontSize: 14,
    color: "#0E6655",
    height: 30,
    marginBottom: 7,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 10,
    paddingVertical: 1,
    marginBottom: 50
  },
});
