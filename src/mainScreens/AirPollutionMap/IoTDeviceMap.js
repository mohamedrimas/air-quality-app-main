import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Header from "../components/Header";
import COLORS from "../../consts/colors";
import Paho from "paho-mqtt";
import { useIsFocused } from "@react-navigation/native";
import LocationIcon from "../../assets/location-pin.png";

const { width } = Dimensions.get("screen");

const host = "45.134.226.131";
const port = Number(8080);
const clientId = `mqtt-async-test-${parseInt(Math.random() * 100)}`;
const topic = "iot/data";

client = new Paho.Client(host, port, clientId);

const IoTDeviceMap = ({ navigation }) => {
  const isFocus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMarkerPress = (markerData) => {
    setSelectedData(markerData);
    setModalVisible(true);
  };

  function onMessage(message) {
    const data = JSON.parse(message.payloadString);
    const {
      gpsLatitude,
      gpsLongitude,
      iotDeviceId,
      ch4Level,
      no2Level,
      co2Level,
    } = data;

    const newMarker = {
      id: iotDeviceId,
      title: iotDeviceId,
      coordinate: { latitude: gpsLatitude, longitude: gpsLongitude },
      ch4Level,
      no2Level,
      co2Level,
    };

    setMarkers((prevMarkers) => {
      const existingMarkerIndex = prevMarkers.findIndex(
        (marker) => marker.id === iotDeviceId
      );

      if (existingMarkerIndex !== -1) {
        const updatedMarkers = [...prevMarkers];
        updatedMarkers[existingMarkerIndex] = newMarker;
        return updatedMarkers;
      } else {
        return [...prevMarkers, newMarker];
      }
    });
  }
  useEffect(() => {
    if (!client.isConnected()) {
      client.connect({
        onSuccess: () => {
          console.log("Connected!");
          client.subscribe(topic);
          client.onMessageArrived = onMessage;
        },
        onFailure: (e) => {
          console.log(e);
        },
      });
    } else {
      client.subscribe(topic);
      client.onMessageArrived = onMessage;
      console.log("Already connected, no need to reconnect.");
    }
  }, [isFocus]);

  // useEffect(() => {
  //   client.connect({
  //     onSuccess: () => {
  //       console.log("Connected!");
  //       client.subscribe(topic);
  //       client.onMessageArrived = onMessage;
  //     },
  //     onFailure: (e) => {
  //       console.log("Failed to connect!");
  //       console.log(e);
  //     },
  //   });
  // }, []);

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

  return (
    <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
      <ScrollView>
        <Header navigation={navigation} title={"IoT Device Map"} />
        <View style={style.container}>
          <MapView
            region={region}
            onRegionChangeComplete={(region) => setRegion(region)}
            style={style.map}
            zoomEnabled={true}
            scrollEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                onPress={() => handleMarkerPress(marker)}
              >
                <Image
                  source={LocationIcon}
                  style={{ height: 35, width: 35 }}
                />
              </Marker>
            ))}
          </MapView>
        </View>
        <View style={style.zoomButtonsContainer}>
          <TouchableOpacity style={style.zoomButton} onPress={zoomIn}>
            <Text style={style.zoomButtonText}>Zoom In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.zoomButton} onPress={zoomOut}>
            <Text style={style.zoomButtonText}>Zoom Out</Text>
          </TouchableOpacity>
        </View>
        {/* Modal for displaying additional data */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              {selectedData && (
                <>
                  <View style={style.modalText}>
                    <Text style={style.title}>IoT Device</Text>
                  </View>
                  <View style={style.dataRow}>
                    <Text style={style.boldText}>CH4 Level: </Text>
                    <Text style={style.modalText}>{selectedData.ch4Level}</Text>
                  </View>
                  <View style={style.dataRow}>
                    <Text style={style.boldText}>NO2 Level: </Text>
                    <Text style={style.modalText}>{selectedData.no2Level}</Text>
                  </View>
                  <View style={style.dataRow}>
                    <Text style={style.boldText}>CO2 Level: </Text>
                    <Text style={style.modalText}>{selectedData.co2Level}</Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={style.zoomButton}
              >
                <Text style={style.zoomButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("IoTDeviceHistroyScreen", {
                    iotId: selectedData.id,
                  });
                }}
                style={style.zoomButton2}
              >
                <Text style={style.zoomButtonText}>View History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default IoTDeviceMap;

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
    marginBottom: 10,
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
  zoomButton2: {
    backgroundColor: COLORS.pink,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 5,
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
  },
});
