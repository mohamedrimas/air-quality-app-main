import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    ScrollView,
    Button,
    ActivityIndicator,
    Alert, RefreshControl, TouchableHighlight, TouchableOpacity, Image
} from "react-native";
import COLORS from "../../../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import constants from "../../../consts/constants";
import * as Expo from 'expo'

const DeficiencyBottomSlide = ({ refRBSheet, navigation, handleOpenCamera }) => {

    const [cameraOn, setCameraOn] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    //const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(false);

    const deceaseDetection = async (image) => {
        setLoading(true);
        console.log("deceaseDetection");
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
        formData.append('file', { uri: localUri, name: localUri.split('/').pop(), type });
        formData.append('req_type', "npk");

        try {
            
            console.log("before result");
            const res = await axios.post(
                constants.backend_url + "/detection/image", formData);
            if (res) {
                console.log("just before result");
                setLoading(false);
                refRBSheet.current.close()
                navigation.navigate("DeficienciesResultScreen", { data: res.data, title: "Deficiency Detection Results", parent: "deficiency" });
            }
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

    useEffect(() => {
        permisionFunction();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        console.log("\n\n");
        console.log(result);
        console.log("\n\n");

        if (!result.canceled) {
            const selectedAsset = result.assets[0];

            setImageUri(selectedAsset.uri);
            await deceaseDetection(selectedAsset);
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
                    <View>
                        <View style={style.panel}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={style.panelTitle}>Upload Photo</Text>
                            </View>
                            <TouchableOpacity
                                style={style.panelButton}
                                onPress={() => handleOpenCamera()}
                            >
                                <Text style={style.panelButtonTitle}>
                                    Take Photo
                                </Text>
                            </TouchableOpacity>
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
                                onPress={() => refRBSheet.current.close()}
                            >
                                <Text style={style.panelButtonTitle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }

        </View>
    );
}

export default DeficiencyBottomSlide;

const style = StyleSheet.create({

    panel: {
        padding: 20,
        backgroundColor: COLORS.backgroundColor,
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
        color: COLORS.darkGreen
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
        marginVertical: 5,
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

    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
    },
    button: {
        flex: 0.1,
        padding: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
});