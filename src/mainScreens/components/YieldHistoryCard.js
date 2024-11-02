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
import { Rating } from "react-native-elements";
import constants from "../../consts/constants";
import axios from "axios";
const { width, height } = Dimensions.get("screen");
const screenHeight = height;

const YieldHistoryCard = ({ data }) => {
    console.log(data)
    return (
        <TouchableHighlight
            underlayColor={COLORS.backgroundColor}
            activeOpacity={0.9}
        >
            <View style={style.menuCard}>
                <View style={style.contentContainer}>
                    <View style={style.row}>
                        <Text style={style.normalText}>
                            Date:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.createdAt.split("T")[0] : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.normalText}>
                            Soil PH:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.soil_ph : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.normalText}>
                            Soil Moisture:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.soil_moisture : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.normalText}>
                        Light Exposure:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.light_exposure : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.normalText}>
                        Humidity:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.humidity : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.normalText}>
                        Temperature:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.temperature : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.normalText}>
                        Rainfall:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.rainfall : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.boldText}>
                        Yield:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.yield : ""}
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>

    );
}
const style = StyleSheet.create({
    menuCard: {
        height: screenHeight / 1.5,
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
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    row: {
        marginBottom: 10,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 150,
    },
    normalText: {
        fontWeight: '500',
        fontSize: 30,
        textAlign: 'center',
        color: COLORS.darkGreen
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        fontStyle:"italic",
        color: COLORS.darkGreen
    },
    mutedText: {
        color: COLORS.indigo
    },
});
export default YieldHistoryCard;

