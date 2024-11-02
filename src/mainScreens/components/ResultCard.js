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

const ResultCard = ({ icon, title, direct, navigation, openBottomSlide,parent }) => {

    return (
        <TouchableHighlight
            underlayColor={COLORS.backgroundColor}
            activeOpacity={0.9}
        >
            <View style={style.menuCard}>
                <View
                    style={{
                        height: 100,
                        //marginLeft: width/3.5,
                        paddingVertical: 10,
                        flex: 1,
                        marginTop: 10
                    }}
                >
                    <Text
                        style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
                    >
                        {title}
                    </Text>
                </View>
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
export default ResultCard;

