import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();

  const screenOptions = {
    headerTitleAlign: "center", 
    headerShown: false,
  };

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
