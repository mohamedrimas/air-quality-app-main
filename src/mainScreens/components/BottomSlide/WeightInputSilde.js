import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    ScrollView,
    Button,
    TextInput,
    ActivityIndicator,
    Alert, RefreshControl, TouchableHighlight, TouchableOpacity
} from "react-native";
import COLORS from "../../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios"
import constants from "../../../consts/constants";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightInputSilde = ({ refRBSheet, navigation, handleOpenCamera }) => {

    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        permisionFunction();
    }, []);
    const pickImage = async () => {
        console.log("pickImage")
        if (weight === "") {
            console.log("fvfvfv")
            return setError("Please Enter weight first!")
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setImageUri(result.uri);
            await deceaseDetection(result);
        }
    };
    const takePicture = async () => {
        if (weight === "") {
            return setError("Please Enter weight first!")
        } else {
            handleOpenCamera(weight)
        }
    };
    const deceaseDetection = async (image) => {
        setError("");
        console.log("quality");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude);
        setLocation(location.coords);

        const userId = await AsyncStorage.getItem('userId');

        let localUri = image.uri;
        let file = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(file);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('lang', location.coords.latitude);
        formData.append('long', location.coords.longitude);
        formData.append('user_Id', userId);
        formData.append('weight', weight);
        formData.append('file', { uri: localUri, name: localUri.split('/').pop(), type });
        formData.append('req_type', "quality");

        try {
            setLoading(true);
            const res = await axios.post(
                constants.backend_url + "/detection/image", formData);

            if (res) {
                setLoading(false);
                navigation.navigate("ResultsScreen", { data: res.data, title: "Quality Detection Results", parent: "quality" });
            }
            console.log("********** ")
            console.log(res.data)
            console.log("********** ")
            //navigation.navigate("Home");
        } catch (err) {
            setLoading(false);
            Alert.alert(
                "Alert",
                "Something went wrong!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            console.log(err);
        }
    }

    const permisionFunction = async () => {
        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(imagePermission.status);

        setGalleryPermission(imagePermission.status === 'granted');

        if (
            imagePermission.status !== 'granted'
        ) {
            alert('Permission for media access needed.');
        }
    };
    return (
        <View>
            {
                loading ? (
                    <View>
                        <Text
                            style={{ fontSize: 22, textAlign: "center", marginTop: 55 }}
                        >
                            Loading...
                        </Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <View style={style.panel}>
                        <Text style={{
                            marginHorizontal: 55,
                            textAlign: "center",
                            marginTop: 3,
                            color: "red"
                        }}>
                            {error}
                        </Text>

                        <View style={style.inputView}>
                            <TextInput onChangeText={text => setWeight(text)} placeholder="Weight (g)" style={{ paddingHorizontal: 10, height: 30, fontSize: 17 }} />
                        </View>
                        <TouchableOpacity
                            style={style.panelButton}
                            onPress={pickImage}
                        >
                            <Text style={style.panelButtonTitle}>
                                Choose From Library
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.panelButton}
                            onPress={takePicture}
                        >
                            <Text style={style.panelButtonTitle}>
                                Take Photo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.panelButton}
                            onPress={() => refRBSheet.current.close()}
                        >
                            <Text style={style.panelButtonTitle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
}

export default WeightInputSilde;

const style = StyleSheet.create({

    panel: {
        padding: 20,
        backgroundColor: COLORS.white,
        paddingTop: 10,
    },

    panelHeader: {
        alignItems: "center",
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 22,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: "gray",
        height: 30,
        marginBottom: 7,
    },
    panelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        marginVertical: 1,
        marginHorizontal: 15
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },

    panelCamIcon: {
        fontSize: 14,
        color: "#0E6655",
        height: 30,
        marginBottom: 7,
    },
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        borderWidth: 2,
        marginTop: 2,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderColor: "#00716F",
        borderRadius: 23,
        paddingVertical: 2,
    },

});