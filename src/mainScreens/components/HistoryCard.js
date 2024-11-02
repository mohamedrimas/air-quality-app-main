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

const HistoryCard = ({ data, parent }) => {
    console.log(data)
    return (
        <TouchableHighlight
            underlayColor={COLORS.backgroundColor}
            activeOpacity={0.9}
        >
            <View style={style.menuCard}>
                <View style={style.contentContainer}>
                    <View style={style.row}>
                        <Text style={style.boldText}>
                            Date:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.createdAt.split("T")[0] : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.boldText}>
                            {parent}:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.label : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.row}>
                        <Text style={style.boldText}>
                            Score:{" "}
                            <Text style={style.mutedText}>
                                {data ? data.score*100+"%" : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={style.imageContainer}>
                        <Image
                            source={{ uri: data ? data.imgURL : "" }}
                            style={style.image}
                            alt="loading..."
                        />
                    </View>
                </View>
            </View>
        </TouchableHighlight>

    );
}
const style = StyleSheet.create({
    menuCard: {
        height: screenHeight / 2,
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
    boldText: {
        fontWeight: '500',
        fontSize: 30,
        textAlign: 'center',
        color: COLORS.darkGreen
    },
    mutedText: {
        color: COLORS.indigo
    },
});
export default HistoryCard;

