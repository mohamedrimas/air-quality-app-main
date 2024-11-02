import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./src/consts/colors";

import Signup from "./src/mainScreens/Signup";
import Login from "./src/mainScreens/Login";
import OnBoardScreen from "./src/mainScreens/OnBoardScreen";
import Profile from "./src/mainScreens/Profile";

import BottomNavigator from "./src/navigation/BottomNavigator";

import OptimalTimeTravel from "./src/mainScreens/OptimalTimeTravel/index";
import OptimalTimeTravelResult from "./src/mainScreens/OptimalTimeTravel/OptimalTimeTravelResult";

import AirPollutionMap from "./src/mainScreens/AirPollutionMap";
import RouteSuggestion from "./src/mainScreens/RouteSuggestion";
import IoTDeviceMap from "./src/mainScreens/AirPollutionMap/IoTDeviceMap";
import AirPollutionLocationMap from "./src/mainScreens/AirPollutionMap/AirPollutionLocationMap";
import PredictAirPollution from "./src/mainScreens/AirPollutionMap/PredictAirPollution";
import PredictCO2Level from "./src/mainScreens/AirPollutionMap/PredictCO2Level/PredictCO2Level";
import PredictAirPollutionHistory from "./src/mainScreens/AirPollutionMap/PredictAirPollutionHistory";
import ChartsScreen from "./src/mainScreens/AirPollutionMap/PredictCO2Level/ChartsScreen";
import PredictCO2LevelHistory from "./src/mainScreens/AirPollutionMap/PredictCO2Level/PredictCO2LevelHistory";
import AirPollutionChartScreen from "./src/mainScreens/AirPollutionMap/AirPollutionChartScreen";
import AirPollutionEducationalScreen from "./src/mainScreens/AirPollutionMap/AirPollutionEducationalScreen";
import Co2RouteScreen from "./src/mainScreens/RouteSuggestion/Co2RouteScreen";
import ShortestRoute from "./src/mainScreens/RouteSuggestion/ShortestRoute";
import TrafficRoute from "./src/mainScreens/RouteSuggestion/TrafficRoute";
import IoTDeviceHistroyScreen from "./src/mainScreens/AirPollutionMap/IoTDeviceScreen";
import { enableScreens } from "react-native-screens";

import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import {
  NotificationProvider,
  useNotification,
} from "./context/NotificationContext";

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log("Received a notification in the background!", {
      data,
      error,
      executionInfo,
    });
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  console.disableYellowBox = true;

  return (
    <NotificationProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="SignUpScreen" component={Signup} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="ProfileScreen" component={Profile} />

          {/* need screens */}
          <Stack.Screen
            name="OptimalTimeTravel"
            component={OptimalTimeTravel}
          />
          <Stack.Screen
            name="OptimalTimeTravelResult"
            component={OptimalTimeTravelResult}
          />

          <Stack.Screen name="AirPollutionMap" component={AirPollutionMap} />
          <Stack.Screen name="IoTDeviceMap" component={IoTDeviceMap} />
          <Stack.Screen
            name="AirPollutionLocationMap"
            component={AirPollutionLocationMap}
          />
          <Stack.Screen
            name="PredictAirPollution"
            component={PredictAirPollution}
          />
          <Stack.Screen name="PredictCO2Level" component={PredictCO2Level} />
          <Stack.Screen name="ChartsScreen" component={ChartsScreen} />
          <Stack.Screen
            name="PredictAirPollutionHistory"
            component={PredictAirPollutionHistory}
          />

          <Stack.Screen
            name="PredictCO2LevelHistory"
            component={PredictCO2LevelHistory}
          />
          <Stack.Screen
            name="AirPollutionChartScreen"
            component={AirPollutionChartScreen}
          />
          <Stack.Screen
            name="AirPollutionEducationalScreen"
            component={AirPollutionEducationalScreen}
          />
          <Stack.Screen
            name="IoTDeviceHistroyScreen"
            component={IoTDeviceHistroyScreen}
          />

          <Stack.Screen name="Co2RouteScreen" component={Co2RouteScreen} />
          <Stack.Screen name="ShortestRoute" component={ShortestRoute} />
          <Stack.Screen name="TrafficRoute" component={TrafficRoute} />
          <Stack.Screen name="RouteSuggestion" component={RouteSuggestion} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default App;
