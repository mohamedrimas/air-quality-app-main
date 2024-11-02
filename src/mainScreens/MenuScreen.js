import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import COLORS from "../consts/colors";
import NameHeader from "./components/NameHeader";
import MenuCard from "./components/MenuCard";
import m1 from "../assets/xx1.png";
import m2 from "../assets/xx2.png";
import m3 from "../assets/xx3.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      setUsername(parsedData.firstname);
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightGreen }}>
      <View>
        <NameHeader navigation={navigation} userName={username} />
      </View>
      <View style={{ top: 10 }}>
        <View
          style={[
            style.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          <MenuCard
            title="Optimal Time Travel"
            direct="OptimalTimeTravel"
            navigation={navigation}
            icon={m3}
          />
          <MenuCard
            title="Air Pollution Map"
            direct="AirPollutionMap"
            navigation={navigation}
            icon={m2}
          />
          <MenuCard
            title="Route Suggestion"
            direct="RouteSuggestion"
            navigation={navigation}
            icon={m1}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // backgroundColor: COLORS.backgroundColor,
  },
});

export default MenuScreen;
