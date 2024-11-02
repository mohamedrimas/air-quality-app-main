import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import COLORS from "../consts/colors";
import MenuScreen from "../mainScreens/MenuScreen";
import Profile from "../mainScreens/Profile";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { colors } = useTheme(); // Access the theme colors

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = "home-filled";
          } else if (route.name === "ProfileScreen") {
            iconName = "account-circle";
          }

          return <Icon
            name={iconName}
            color={focused ? COLORS.lightGreen : "#1F8A70"} // Change color based on focus
            size={28}
            style={{ top: 10 }}
          />;
        },
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          height: 55,
          borderTopWidth: 0,
          elevation: 5,
          backgroundColor: COLORS.backgroundColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="HomeScreen" component={MenuScreen} />
      <Tab.Screen name="ProfileScreen" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
