import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  TextInput,
  Alert,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../../consts/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import constants from "../../../consts/constants";
import * as Location from "expo-location";
import ModalDropdown from "react-native-modal-dropdown";

const FertilizerSlide = ({ refRBSheet, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [density, setDensity] = useState("");
  const [yieldValue, setYieldValue] = useState("");
  const [dressingStage, setDeressingStage] = useState("");
  const [iot, setIot] = useState("");

  const onSubmit = async () => {
    const userId = await AsyncStorage.getItem("userId");
    let location = await Location.getCurrentPositionAsync({});
    let data = {
      IoTId: iot,
      user_Id: userId,
      lang: location.coords.latitude,
      long: location.coords.longitude,
      plant_density: density,
      yield_value: yieldValue,
      dressing_stage: dressingStage,
    };
    console.log(data);
    try {
      const res = await axios.post(
        constants.backend_url + "/fertilizer-detection/detect",
        data
      );
      //console.log(res)
      console.log(res.data);
      if (res) {
        navigation.navigate("ResultsScreen", {
          data: res.data,
          title: "Fertilizer Recommendations Results",
          parent: "fertilizer",
        });
      }
      //navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }

    //navigation.navigate("ResultsScreen", { title: "Yield Results" })
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
          <View style={style.inputView}>
            <TextInput
              onChangeText={(text) => setDensity(text)}
                placeholder="Plant Density (plants/ha)"
              style={{ paddingHorizontal: 10, height: 30, fontSize: 17 }}
            />
          </View>
          <View style={style.inputView}>
            <TextInput
              onChangeText={(text) => setIot(text)}
              placeholder="IoT ID"
              style={{ paddingHorizontal: 10, height: 30, fontSize: 17 }}
            />
          </View>
          <View style={style.inputView}>
            <TextInput
              onChangeText={(text) => setYieldValue(text)}
                placeholder="Expected Yield Value (kg/ha)"
              style={{ paddingHorizontal: 10, height: 30, fontSize: 17 }}
            />
          </View>
          <View style={style.inputView}>
            {/* <TextInput onChangeText={text => setDeressingStage(text)} placeholder="Enter Dressing Stage" style={{ paddingHorizontal: 10, height: 30, fontSize: 17 }} /> */}
            <ModalDropdown
              defaultValue="Dressing Stage"
              //placeholder="Enter Crop"
              style={{ paddingHorizontal: 10, height: 30, fontSize: 17 }}
              dropdownStyle={{
                marginTop: 0.5,
                width: "60%",
                borderRadius: 10,
                borderWidth: 0,
                elevation: 3,
                overflow: "hidden",
              }}
              textStyle={{ fontSize: 18, color: "#00716F" }}
              onSelect={(text) => {
                let ds = constants.DressingsStages[text];

                console.log(ds);
                setDeressingStage(ds);
              }}
              options={constants.DressingsStages}
            />
          </View>
          <TouchableOpacity
            style={style.panelButton}
            onPress={() => onSubmit()}
          >
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

export default FertilizerSlide;

const style = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: COLORS.white,
    paddingTop: 10,
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    marginVertical: 2,
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
    borderRadius: 23,
    paddingVertical: 1,
  },
});
