import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notes from '../screens/NotesScreen/Notes';
import ListsScreen from '../screens/NotesScreen/ListsScreen';
import TodoStackScreen from "./TodoStack";
import NoteStackScreen from "./NoteStack";

const NotesStackScreen = () => {
  const notesNav = createMaterialTopTabNavigator();

  const screenOptions = {
    headerTitleAlign: "center", 
    headerShown: false,
  };

  return (
    <notesNav.Navigator screenOptions={screenOptions}>
      <notesNav.Screen name="Notes" component={NoteStackScreen} />
      <notesNav.Screen name="To-do's" component={TodoStackScreen} />
    </notesNav.Navigator>
  );
};

export default NotesStackScreen;
