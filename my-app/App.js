import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notes from './screens/Notes';
import CreateNote from './screens/CreateNote';
import DetailedNote from './screens/DetailedNote';

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{
            title: 'NOTES APP',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#E99D42' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateNote}
          options={{
            title: 'CREATE NOTES',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#E99D42' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailedNote}
          options={{
            title: 'NOTES DETAILS',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#E99D42' },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

