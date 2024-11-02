import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker,
    Platform,
    Button,
    Dimensions
} from "react-native";
import COLORS from "../../consts/colors";
import axios from "axios";
import Header from "../components/Header";
import SubmitButton from "../components/SubmitButton";
import DetailCard from "../components/DetailCard";

const { width } = Dimensions.get("screen");


const PollutionDetails = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <View style={{ backgroundColor: COLORS.backgroundColor, height: "100%" }}>
            <ScrollView>
                <Header navigation={navigation} title={"Prediction Details"} />
                <DetailCard />
                <SubmitButton onSubmit={() => { }} title={"Done"} isLoading={isLoading} />
            </ScrollView>
        </View>
    );
};

export default PollutionDetails;

const style = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: "20%",
        paddingBottom: "10%"
    },
});
