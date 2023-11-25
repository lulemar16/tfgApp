import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notes from './screens/Notes';
import CreateNote from './screens/CreateNote';
import DetailedNote from './screens/DetailedNote';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';

export default function App() {
  
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator
        initialRouteName="Login" // Set the initial route to "Login"
      >

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'LOGIN',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#E99D42' },
            headerTintColor: 'white',
          }}
        />
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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'USER PROFILE',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#E99D42' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: 'SIGN UP',
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

