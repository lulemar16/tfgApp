import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notes from '../screens/NotesScreen/Notes';
import ListsScreen from '../screens/NotesScreen/ListsScreen';


const NotesStackScreen = () => {
  const notesNav = createMaterialTopTabNavigator();

  const screenOptions = {
    headerTitleAlign: "center", 
  };

  return (
    <notesNav.Navigator screenOptions={screenOptions}>
      <notesNav.Screen name="Notes" component={Notes} />
      <notesNav.Screen name="To-do" component={ListsScreen} />
    </notesNav.Navigator>
  );
};

export default NotesStackScreen;
