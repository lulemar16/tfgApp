import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import ListsScreen from '../screens/NotesScreen/ListsScreen';
import EditList from "../screens/NotesScreen/EditList";
import TodoList from "../screens/NotesScreen/TodoList";


const TodoStackScreen = () => {
  const todoNav = createStackNavigator();

  const screenOptions = {
    headerTitleAlign: "center", 
    headerShown: false,
  };

  return (
    <todoNav.Navigator screenOptions={screenOptions}>
      <todoNav.Screen name="To-do" component={ListsScreen} />
      <todoNav.Screen name="Edit" component={EditList} />
      <todoNav.Screen name="ToDoList" component={TodoList} />
    </todoNav.Navigator>
  );
};

export default TodoStackScreen;
