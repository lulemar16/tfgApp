import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();

  const screenOptions = {
    headerTitleAlign: "center", 
  };

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
