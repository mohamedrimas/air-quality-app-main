import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
const { width, height } = Dimensions.get("screen");
const screenHeight = height;

const SubMenuCard = ({ icon, title, direct, navigation, openBottomSlide, parent, changeView }) => {

    return (
        <TouchableHighlight
            underlayColor={COLORS.backgroundColor}
            activeOpacity={0.9}
            onPress={() => { navigation.navigate(direct) }}
        >
            <View style={style.menuCard}>
                <Image source={icon} style={{ height: 90, width: 90 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 50,
                        paddingVertical: 10,
                        flex: 1,
                        marginTop: 50
                    }}
                >
                    <Text
                        style={{ fontWeight: "bold", fontSize: 17, textAlign: "left", color: COLORS.darkGreen }}
                    >
                        {title}
                    </Text>
                    {/* <Text
                        style={{ fontSize: 16, color: COLORS.grey, fontWeight: "bold" }}
                    >
                        Sample Text
                    </Text>
                    <Text
                        style={{ fontSize: 16, color: COLORS.grey, fontWeight: "bold" }}
                    >
                        Sample Text
                    </Text> */}
                </View>
                <Image source={require("../../assets/go.png")} style={{ height: 30, width: 20 }} />
            </View>
        </TouchableHighlight>

    );
}
const style = StyleSheet.create({
    menuCard: {
        height: screenHeight / 7,
        borderRadius: 10,
        backgroundColor: COLORS.backgroundColor,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",

        elevation: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});
export default SubMenuCard;

