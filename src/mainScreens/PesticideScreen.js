import React, { useEffect, useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    ScrollView,
    Button,
    TouchableOpacity,
    Alert, RefreshControl, TouchableHighlight
} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Linking } from 'react-native';
const { width, height } = Dimensions.get("screen");
const screenHeight = height;

const PesticideScreen = ({ navigation }) => {
    const refRBSheet = useRef();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
            <ScrollView>
                <View style={style.header}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="arrow-back-ios" style={{ marginTop: 12 }} size={28} onPress={() => navigation.goBack()} />
                        <Icon name="home" style={{ marginTop: 12 }} size={28} onPress={() => navigation.navigate("Home")} />
                        <Text style={{ fontSize: 23, fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>
                            Pesticides
                        </Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={style.maintext}>
                            Chemical Name:
                        </Text>
                        <Text style={style.normaltext}>
                            Fenobucarb 500g/l EC
                        </Text>

                        <Text style={style.maintext}>
                            Manufacturer:
                        </Text>
                        <Text style={style.normaltext}>
                            Asiatic Agricultural
                        </Text>

                        <Text style={style.maintext}>
                            Product Name:
                        </Text>
                        <Text style={style.normaltext}>
                            Hayleys BPMC
                        </Text>

                        <Text style={style.maintext}>
                            Existing Packs Available:
                        </Text>
                        <Text style={style.normaltext}>
                            100ml, 200ml, 400ml
                        </Text>

                        <Text style={style.maintext}>
                            Early growth stage:
                        </Text>
                        <Text style={style.normaltext}>
                            640-800 ml
                        </Text>

                        <Text style={style.maintext}>
                            10 ltrs-20 ml | 16 ltrs-32 ml
                        </Text>

                        <Text style={style.maintext}>
                            Pre Harvest Interval -14 Days
                        </Text>

                        <Text style={style.maintext}>
                            Application Guidelines:
                        </Text>
                        <Text style={style.normaltext}>
                            Squirt solution into crates burrows after removing the swirl plate from the nozzle
                        </Text>
                        <Text style={{ color: 'blue', fontSize: 18, marginLeft: 10, padding: 10 }}
                            onPress={() => Linking.openURL('https://www.hayleysagriculture.com/product_details.php?id=149')}>
                            See More
                        </Text>
                    </View>
                </View>
                <View>
                    {/* <Image
                        style={{
                            width: "100%",
                            height: screenHeight / 3,
                            resizeMode: "contain",
                            marginVertical: 10,
                        }}
                        source={require("../assets/fer.jpeg")}
                    /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    panelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 15
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
    maintext: {
        fontSize: 18, marginLeft: 10, marginTop: 8, padding: 10, fontWeight: 'bold', color: "black"
    },
    normaltext: {
        fontSize: 18, marginLeft: 10, padding: 10, marginTop: -15, color:"#7F7F7F"
    }
});

export default PesticideScreen;