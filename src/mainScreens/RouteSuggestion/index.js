import React, { useEffect, useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
} from "react-native";
import COLORS from "../../consts/colors";
import SubMenuCard from "../components/SubMenuCard";
import image1 from "../../assets/r1.png";
import image2 from "../../assets/r2.png";
import image3 from "../../assets/r3.png";
import image4 from "../../assets/aa-4.png";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
const { height } = Dimensions.get("screen");
const screenHeight = height;


const RouteSuggestion = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
            <ScrollView>
                <Header navigation={navigation} title={"Route suggestion"} />
                <View>
                    <Image
                        style={{
                            width: "100%",
                            height: screenHeight / 3,
                            resizeMode: "contain",
                            marginVertical: 10,
                        }}
                        source={require("../../assets/mind.png")}
                    />
                    <View>
                        <SubMenuCard
                            icon={image1}
                            navigation={navigation}
                            title="Optimal Pollution Route"
                            direct={"Co2RouteScreen"}
                        />
                        <SubMenuCard
                            icon={image2}
                            navigation={navigation}
                            direct={"ShortestRoute"}
                            title="Shortest Distance Route"
                        />
                        <SubMenuCard
                            icon={image3}
                            navigation={navigation}
                            direct={"TrafficRoute"}
                            title="Optimal Traffic Route"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    cameraContainer: {
        flex: 1,
        //flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
    },
    panelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 15,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
});

export default RouteSuggestion;
