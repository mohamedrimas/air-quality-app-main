import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Header from "../components/Header";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import { getAirQualityInterpretation } from "../../utils/Util";
import { useIsFocused } from "@react-navigation/native";
import AirPollutionChart from "./AirPollutionChart";

const defaultCoordinate = {
  latitude: 7.2912,
  longitude: 80.6563,
};

const { width } = Dimensions.get("screen");

const AirPollutionLocationMap = ({ navigation }) => {
  const isFocus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [moreData, setMoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCityData, setSelectedCityData] = useState([]);

  const [region, setRegion] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          constants.backend_url + "/levels/active-city-levels"
        );

        setLocations(
          response.data.map((location, index) => ({
            id: index + 1,
            title: location.city,
            description: `${location.city} Area`,
            coordinate: {
              latitude: location?.gpsLatitude
                ? location?.gpsLatitude
                : defaultCoordinate.latitude,
              longitude: location?.gpsLongitude
                ? location?.gpsLongitude
                : defaultCoordinate.longitude,
            },
            // coordinate: { latitude: location?.gpsLatitude, longitude: location?.gpsLongitude },
            radius: 500,
            data: location,
          }))
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocus]);

  const handleCirclePress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
    const getMoreData = getAirQualityInterpretation(
      location.data.averageSO2Level,
      location.data.averageNO2Level,
      0,
      location.data.averageCO2Level
    );
    setMoreData(getMoreData);
  };

  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  const viewEducationalContent = (data) => {
    setModalVisible(false);
    if (moreData)
      navigation.navigate("AirPollutionEducationalScreen", {
        data: moreData?.insights,
      });
  };

  const legends = [
    { color: "red", label: "Hazardous" },
    { color: "yellow", label: "Moderate" },
    { color: "green", label: "Good" },
  ];

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Air Pollution Location Map"} />
        <View style={style.container}>
          <MapView
            region={region}
            onRegionChangeComplete={(region) => setRegion(region)}
            style={style.map}
            provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          >
            {locations.map((location) => {
              const currentLocationData = getAirQualityInterpretation(
                location.data.averageSO2Level,
                location.data.averageNO2Level,
                0,
                location.data.averageCO2Level
              );

              if (
                !location.coordinate ||
                !location.coordinate.latitude ||
                !location.coordinate.longitude
              ) {
                return null;
              }

              return (
                <React.Fragment key={location.id}>
                  <Circle
                    center={location.coordinate}
                    radius={location.radius}
                    strokeWidth={1}
                    strokeColor="rgba(255, 69, 58, 0.8)"
                    fillColor={currentLocationData.areaColor}
                    onPress={() => handleCirclePress(location)}
                  />
                  <Marker
                    coordinate={location.coordinate}
                    title={location.title}
                    description={location.description}
                    onPress={() => handleCirclePress(location)}
                  />
                </React.Fragment>
              );
            })}
          </MapView>
        </View>
        <View style={style.ledContainer}>
          {legends.map((item, index) => (
            <View key={index} style={style.legendItem}>
              <View style={[style.colorBox, { backgroundColor: item.color }]} />
              <Text style={style.label}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={style.zoomButtonsContainer}>
          <TouchableOpacity style={style.zoomButton} onPress={zoomIn}>
            <Text style={style.zoomButtonText}>Zoom In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.zoomButton} onPress={zoomOut}>
            <Text style={style.zoomButtonText}>Zoom Out</Text>
          </TouchableOpacity>
        </View>
        {/* Modal for displaying air pollution data */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              {selectedLocation && (
                <View>
                  <View style={style.modalText}>
                    <Text style={style.title}>Location Air Pollution</Text>
                  </View>
                  <View style={style.dataRow}>
                    <Text style={style.boldText}>Location: </Text>
                    <Text style={style.modalText}>
                      {selectedLocation.data.city}
                    </Text>
                  </View>
                  <View style={{ textAlign: "left" }}>
                    {/* <View style={{ marginBottom: 20 }}>
                      <Text style={style.boldText}>CH4 Level:  {selectedLocation.data.averageCH4Level.toFixed(2)} </Text>
                    </View> */}
                    <View style={{ marginBottom: 20 }}>
                      <Text style={style.boldText}>
                        CO2 Level:{" "}
                        {selectedLocation.data.averageCO2Level.toFixed(2)}{" "}
                      </Text>
                      <Text style={style.modalText}>
                        {moreData?.co2?.description}
                      </Text>
                      {/* <Text style={style.muted}>
                        {moreData?.co2?.interpretation}
                      </Text> */}
                      <Text
                        style={[
                          style.muted,
                          {
                            color:
                              moreData?.co2?.interpretation === "Good"
                                ? "green"
                                : moreData?.co2?.interpretation === "Moderate"
                                ? "yellow"
                                : moreData?.co2?.interpretation === "Hazardous"
                                ? "red"
                                : "black",
                          },
                        ]}
                      >
                        {moreData?.co2?.interpretation}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                      <Text style={style.boldText}>
                        NO2 Level:{" "}
                        {selectedLocation.data.averageNO2Level.toFixed(2)}{" "}
                      </Text>
                      <Text style={style.modalText}>
                        {moreData?.no2?.description}
                      </Text>
                      {/* <Text style={style.muted}>
                        {moreData?.no2?.interpretation}
                      </Text> */}
                      <Text
                        style={[
                          style.muted,
                          {
                            color:
                              moreData?.no2?.interpretation === "Good"
                                ? "green"
                                : moreData?.no2?.interpretation === "Moderate"
                                ? "yellow"
                                : moreData?.no2?.interpretation === "Hazardous"
                                ? "red"
                                : "black",
                          },
                        ]}
                      >
                        {moreData?.no2?.interpretation}
                      </Text>
                    </View>
                    {/* <View style={{ marginBottom: 20 }}>
                      <View style={style.insightsContainer}>
                        <Text style={style.boldText}>Insight:</Text>
                        <Text style={style.modalText}>{moreData?.insights?.message}</Text>
                        <Text style={style.modalText}>{moreData?.insights?.educationalInsights}</Text>
                        <Text style={style.muted}>{moreData?.insights?.precaution}</Text>
                      </View>
                    </View> */}
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={style.modelButton}
                onPress={() => viewEducationalContent()}
              >
                <Text style={style.zoomButtonText}>View Insights</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.modelButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("AirPollutionChartScreen", {
                    city: selectedLocation.data.city,
                  });
                }}
              >
                <Text style={style.zoomButtonText}>View History</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.modelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={style.zoomButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AirPollutionLocationMap;

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 50,
    marginTop: 20,
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
  modelButton: {
    backgroundColor: COLORS.pink,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 5,
    marginBottom: 20,
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
    // color: '#666',
  },
  insightsContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  ledContainer: {
    flexDirection: "column",
    padding: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
