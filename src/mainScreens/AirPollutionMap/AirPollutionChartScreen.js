import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import MapView, { Circle, Marker } from "react-native-maps";
import Header from "../components/Header";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import { getAirQualityInterpretation } from "../../utils/Util";
import { useIsFocused } from "@react-navigation/native";
import AirPollutionChart from "./AirPollutionChart";
import CityDataCard from "../components/CityDataCard";

const defaultCoordinate = {
  latitude: 7.2912,
  longitude: 80.6563,
};

const { width } = Dimensions.get("screen");

const AirPollutionChartScreen = ({ route, navigation }) => {
  const isFocus = useIsFocused();
  const { city } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          constants.backend_url + "/levels/a-city-history/" + city
        );
        const sortedData = await response?.data?.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const latest10 = sortedData.slice(0, 10);
        setSelectedCityData(latest10);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Air Pollution History"} />
        <Text style={style.cityTitle}>{city}</Text>
        <View style={style.container}>
          {isLoading && <ActivityIndicator size="small" />}
          {!selectedCityData && (
            <View style={style.modalText}>
              <Text style={style.title}>No Data</Text>
            </View>
          )}
          <CityDataCard selectedCityData={selectedCityData} />
          {/* {selectedCityData.map((item, index) => (
            <View key={index}>
              <AirPollutionChart data={item} />
            </View>
          ))} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default AirPollutionChartScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 50,
    marginTop: 10,
  },
  map: {
    width: width / 1.2,
    height: width,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    // marginBottom: 10,
    color: COLORS.darkGreen,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkGreen,
  },
  dataRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  closeButton: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.pink,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  zoomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  zoomButton: {
    backgroundColor: COLORS.pink,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 30,
    marginBottom: 20,
  },
  zoomButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    color: COLORS.darkGreen,
    textAlign: "center",
  },
  muted: {
    fontSize: 16,
    color: "#666",
  },
  cityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: COLORS.darkGreen,
    textAlign: "center",
  },
});
