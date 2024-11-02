import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import COLORS from "../../consts/colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import user from "../../assets/user.png";
import constants from "../../consts/constants";

const NameHeader = ({ navigation, userName, photo }) => {

  return (
    <View style={style.header}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Image
              style={{
                width: 100,
                resizeMode: "contain",
              }}
              source={require("../../assets/atmo.png")}
            />
          </View>
          <View>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.darkGreen }}>Hello, {userName ? userName : ""}</Text>
            <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.darkGreen }}>
              What do you want today
            </Text>
          </View>
        </View>
      </View>
      <TouchableHighlight
        underlayColor={COLORS.backgroundColor}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("MyAccount")}
      >
        {
          photo === "" ? (
            <Image
              source={user}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
          ) : (
            <Image
              source={{ uri: constants.backend_url + photo }}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
          )
        }
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    top: 30,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default NameHeader;
