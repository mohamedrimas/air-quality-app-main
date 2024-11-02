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
const { width } = Dimensions.get("screen");
import { Rating } from "react-native-elements";
import constants from "../../consts/constants";
import user from "../../assets/user.png";
import axios from "axios"
const card = width;
//
const FeedbackCard = ({ navigation, feedback }) => {



    return (
        <TouchableHighlight
            underlayColor={COLORS.backgroundColor}
            activeOpacity={0.9}
            key={feedback._id}
        >
            <View style={style.mainCard}>
                {
                    feedback.student_id.photo === "" ? (
                        <Image
                            source={user}
                            style={{ height: 50, width: 50, borderRadius: 25, marginTop: -75 }}
                        />
                    ) : (
                        <Image
                            source={{ uri: constants.backend_url + feedback.student_id.photo }}
                            style={{ height: 50, width: 50, borderRadius: 25, marginTop: -75 }}
                        />
                    )
                }
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: -5,
                        flex: 1,
                        marginTop: -30
                    }}
                >
                    <Text
                        style={{ fontWeight: "bold", fontSize: 15, textAlign: "left" }}
                    >
                        {feedback.student_id.first_name}{" "} {feedback.student_id.last_name}
                    </Text>
                    <Text
                        style={{ fontSize: 12, color: COLORS.grey, fontWeight: "bold" }}
                    >
                        {feedback.createdAt.split("T")[0]}
                    </Text>
                    <View style={{ flexWrap: 'wrap', marginLeft: 0 }}>
                        <Rating
                            style={{ marginTop: 2, paddingHorizontal: 0 }}
                            imageSize={15}
                            startingValue={feedback.rate}
                            readonly={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                        <Text style={style.commonText}>
                            {feedback.review}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>

    );
}
const style = StyleSheet.create({
    mainCard: {
        height: card / 2.5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
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
    commonText: {
        fontSize: 13,
        color: COLORS.grey,
    },
    grade: {
        fontSize: 16,
        color: COLORS.grey,
        fontWeight: "bold",
        marginLeft: 15
    },
    rate: {
        marginTop: 12,
        fontSize: 15,
        color: COLORS.grey,
        fontWeight: "bold",
        marginLeft: 0
    }
});
export default FeedbackCard;

