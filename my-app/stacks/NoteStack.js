import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Notes from '../screens/NotesScreen/Notes';
import EditNote from "../screens/NotesScreen/EditNote";
import DetailedNote from "../screens/NotesScreen/DetailedNote";


const NoteStackScreen = () => {
  const noteNav = createStackNavigator();

  const screenOptions = {
    headerTitleAlign: "center", 
    headerShown: false,
  };

  return (
    <noteNav.Navigator screenOptions={screenOptions}>
      <noteNav.Screen name="Note" component={Notes} />
      <noteNav.Screen name="EditNote" component={EditNote} />
      <noteNav.Screen name="DetailedNote" component={DetailedNote} />
    </noteNav.Navigator>
  );
};

export default NoteStackScreen;
