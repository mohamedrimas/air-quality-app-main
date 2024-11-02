import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import SubmitButton from "../components/SubmitButton";
import COLORS from "../../consts/colors";
import {
  extractCitiesAndDistance,
  formatRoutes,
  processRoutes,
} from "../../utils/Util";
import { useDistanceMatrix } from "./routesUtills";
import axios from "axios";
import constants from "../../consts/constants";
import { useShortestRoute } from "./hooks/useShortestRoute";
import { FlatList } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

const TrafficRoute = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [region, setRegion] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const fetchLocationSuggestions = async (
    input,
    setLocation,
    setSuggestions
  ) => {
    try {
      const API_KEY = constants.map_api_key;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}`
      );
      const json = await response.json();
      setSuggestions(json.predictions);
    } catch (err) {
      setError("Failed to fetch location suggestions");
      console.error(err);
    }
  };

  const fetchCoordinates = async (location, setCoords) => {
    try {
      const API_KEY = constants.map_api_key;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`
      );
      const json = await response.json();
      if (json.results && json.results.length > 0) {
        const coords = json.results[0].geometry.location;
        setCoords({ lat: coords.lat, lng: coords.lng });
      } else {
        throw new Error("Invalid location data received");
      }
    } catch (err) {
      setError("Failed to fetch coordinates");
      console.error(err);
    }
  };

  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      setError("");
      const API_KEY = constants.map_api_key;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.lat},${startCoords.lng}&destination=${endCoords.lat},${endCoords.lng}&alternatives=true&key=${API_KEY}`
      );
      const json = await response.json();

      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch routes");
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleStartLocationChange = (text) => {
    setStartLocation(text);
    fetchLocationSuggestions(text, setStartLocation, setStartSuggestions);
  };

  console.log("start: ", startLocation);
  console.log("end: ", endLocation);

  const handleEndLocationChange = (text) => {
    setEndLocation(text);
    fetchLocationSuggestions(text, setEndLocation, setEndSuggestions);
  };

  const selectLocation = async (
    location,
    setLocation,
    setCoords,
    setSuggestions
  ) => {
    setLocation(location);
    setSuggestions([]);
    await fetchCoordinates(location, setCoords);
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

  const { distanceMatrix, loading } = useDistanceMatrix(
    startLocation,
    endLocation
  );

  // console.log("distanceMatrix");
  // console.log(distanceMatrix);

  const handleSubmit = async () => {
    try {
      ///route/shortest-distance-route
      setIsLoading(true);
      console.log(distanceMatrix);
      const response = await axios.post(
        constants.backend_url + "/route/optimal-traffic-route",
        { routes: distanceMatrix }
      );
      const getRoutes = response?.data?.route?.path;
      if (getRoutes) {
        if (getRoutes[getRoutes.length - 1] !== endLocation) {
          getRoutes.push(endLocation);
        }
        setRoutes(getRoutes);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("handleSubmit error: ", error);
      Alert("Somthing went wrong please try again later");
    }
  };

  const { coordinates, routeCoordinates } = useShortestRoute(routes);

  const renderCity = ({ item }) => (
    <TouchableOpacity style={style.cityContainer}>
      <Text style={style.cityName}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"Optimal Traffic Route"} />
        <Dropdown
          label="Start Location"
          value={startLocation}
          onChangeText={handleStartLocationChange}
          data={startSuggestions}
          onSelect={(description) =>
            selectLocation(
              description,
              setStartLocation,
              setStartCoords,
              setStartSuggestions
            )
          }
        />
        <Dropdown
          label="End Location"
          value={endLocation}
          onChangeText={handleEndLocationChange}
          data={endSuggestions}
          onSelect={(description) =>
            selectLocation(
              description,
              setEndLocation,
              setEndCoords,
              setEndSuggestions
            )
          }
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
        <View style={{ marginTop: -40 }}>
          <SubmitButton
            onSubmit={handleSubmit}
            title={"Check"}
            isLoading={isLoading || loading}
          />
        </View>
        {routes && (
          <View style={style.container}>
            <FlatList
              data={routes}
              renderItem={renderCity}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}

        {startCoords && endCoords && (
          <View style={style.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              region={region}
              initialRegion={{
                latitude: startCoords.lat,
                longitude: startCoords.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={style.map}
            >
              {routeCoordinates.length > 0 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor="#0000FF"
                  strokeWidth={4}
                />
              )}
            </MapView>
            <View style={style.zoomButtonsContainer}>
              <TouchableOpacity style={style.zoomButton} onPress={zoomIn}>
                <Text style={style.zoomButtonText}>Zoom In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.zoomButton} onPress={zoomOut}>
                <Text style={style.zoomButtonText}>Zoom Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TrafficRoute;

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 50,
  },
  map: {
    width: width / 1.2,
    height: width,
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.backgroundColor,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  cityContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: COLORS.backgroundColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  cityName: {
    fontSize: 18,
    color: COLORS.lightBlue,
    fontWeight: "500",
  },
});
