import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
