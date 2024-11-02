import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import constants from "../consts/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import user from "../assets/user.png";
const { width } = Dimensions.get("screen");

const card = width;

const Profile = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDeatils] = useState([]);
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      setUserDeatils(parsedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDiseases = async () => {
      const newDiseases = [];
      if (!userDetails.copdStat) newDiseases.push("COPD");
      if (!userDetails.asthmaStat) newDiseases.push("Asthma");
      if (!userDetails.bronchitisStat) newDiseases.push("Bronchitis");
      if (!userDetails.lungCancerStat) newDiseases.push("Lung Cancer");

      setDiseases(newDiseases);
    };

    fetchDiseases();
  }, [userDetails]);

  console.log(userDetails);

  console.log("\n\n\n==============");
  console.log(diseases);
  console.log("==============\n\n\n");

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.backgroundColor, flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header2}></View>
          <Image style={styles.avatar} source={user} />
          <View style={styles.body}>
            {/* <Text style={styles.logout}>Sign out</Text> */}
            <View style={styles.bodyContent}>
              {/* <Text style={styles.name}>Name</Text>
              <Text style={styles.info}>Email</Text> */}
              <Text style={styles.description}>
                First Name :{" "}
                {userDetails.firstname ? userDetails.firstname : "-"}
              </Text>
              <Text style={styles.description}>
                Last Name : {userDetails.lastname ? userDetails.lastname : "-"}
              </Text>
              <Text style={styles.description}>
                Email: {userDetails.email ? userDetails.email : "-"}
              </Text>
              {diseases.length > 0 && (
                <Text style={styles.description}>
                  Diseases: {diseases.join(", ")}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("BoardScreen");
                  AsyncStorage.clear();
                }}
                style={styles.buttonContainer}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  <Icon name="logout" size={20} />
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    top: 20,
    marginBottom: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  header2: {
    backgroundColor: COLORS.lightGreen,
    height: 150,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 3,
  },
  description: {
    fontSize: 16,
    color: COLORS.darkGreen,
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 40,
    backgroundColor: COLORS.pink,
    color: COLORS.white,
  },
  logout: {
    textAlign: "right",
    padding: 5,
    marginRight: 5,
    marginTop: -30,
  },
});

export default Profile;
