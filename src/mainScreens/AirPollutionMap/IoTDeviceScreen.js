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
import Header from "../components/Header";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import { useIsFocused } from "@react-navigation/native";
import IoTDataCard from "../components/IoTDataCard";
import { getCityFromCoordinates } from "../../utils/GetCityFromCoordinates";

const defaultCoordinate = {
  latitude: 7.2912,
  longitude: 80.6563,
};

const { width } = Dimensions.get("screen");

const IoTDeviceHistroyScreen = ({ route, navigation }) => {
  const isFocus = useIsFocused();
  const { iotId } = route.params;
  // const [idOfIot, setIdOfIot] = useState(iotId);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      console.log(
        "selectedCityData: ",
        constants.backend_url + "/levels/a-iot-history/" + iotId
      );
      try {
        const response = await axios.get(
          constants.backend_url + "/levels/a-iot-history/" + iotId
        );
        let data = response.data;
        if (data.length > 500) {
          data = data.slice(-100);
        }
        setSelectedCityData(data);
        setIsLoading(false);
      } catch (err) {
        console.log("Error: ", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"IoT Device History"} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.darkGreen,
                }}
              >
                IoT ID: {iotId}
              </Text>
              <IoTDataCard selectedCityData={selectedCityData} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default IoTDeviceHistroyScreen;

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
});
