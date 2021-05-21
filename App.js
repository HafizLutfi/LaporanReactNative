import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/page/Login";
import Register from "./src/page/Register";
import MainMenu from "./src/page/MainMenu";
import Laporan from "./src/page/Laporan";
import camera from "./src/page/camera";
import { Provider } from "react-redux";
import store from "./src/redux/Store";
import MapKejadian from "./src/page/MapKejadian";
import HistoryKejadian from "./src/page/HistoryKejadian";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="MainMenu" component={MainMenu} />
          <Stack.Screen name="Laporan" component={Laporan} />
          <Stack.Screen name="camera" component={camera} />
          <Stack.Screen name="MapKejadian" component={MapKejadian} />
          <Stack.Screen name="HistoryKejadian" component={HistoryKejadian} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
