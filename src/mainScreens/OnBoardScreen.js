import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";
import COLORS from "../consts/colors";
import { PrimaryButton } from "./components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnBoardScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("Home");
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGreen }}>
      <View style={style.upperContainer}>
        <Image
          style={{
            // width: "50%",
            resizeMode: "contain",
            top: 30,
          }}
          source={require("../assets/atmo.png")}
        />
      </View>
      <View style={style.textContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
              color: COLORS.secondary,
            }}
          >
            Anytime, anywhere
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: "center",
              color: COLORS.secondary,
            }}
          >
            Assist to monitor Air Pollution,
          </Text>
        </View>
        <View>
          <View style={style.indicatorContainer}>
            <View style={style.currentIndicator} />
            <View style={style.indicator} />
            <View style={style.indicator} />
          </View>
          <PrimaryButton
            onPress={() => navigation.navigate("LoginScreen")}
            title="Let's Go!"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 2,
    paddingHorizontal: 50,
    justifyContent: "space-between",
    paddingBottom: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: COLORS.backgroundColor,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.pink,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.pink,
    marginHorizontal: 5,
  },
  upperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnBoardScreen;
