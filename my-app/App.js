import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ListsScreen from './screens/ListsScreen'; 
import AudioScreen from './screens/AudioScreen'; 
import StatisticsScreen from './screens/StatisticsScreen';
import Notes from './screens/Notes';
import HomeScreen from './screens/HomeScreen';

import CreateNote from './screens/CreateNote';
import DetailedNote from './screens/DetailedNote';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';


export default function App() {
  
  // const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  

  function MyStack() {
    return (
      // <Stack.Navigator
      //   initialRouteName="Home" // Set the initial route to "Login"
      // >

      //   {/* <Stack.Screen
      //     name="Login"
      //     component={LoginScreen}
      //     options={{
      //       title: 'LOGIN',
      //       headerTitleAlign: 'center',
      //       headerStyle: { backgroundColor: '#E99D42' },
      //       headerTintColor: 'white',
      //     }}
      //   /> */}
      //   <Stack.Screen
      //     name="Notes"
      //     component={Notes}
      //     options={{
      //       title: 'NOTES APP',
      //       headerTitleAlign: 'center',
      //       headerStyle: { backgroundColor: '#E99D42' },
      //       headerTintColor: 'white',
      //     }}
      //   />
      //   <Stack.Screen
      //     name="Create"
      //     component={CreateNote}
      //     options={{
      //       title: 'CREATE NOTES',
      //       headerTitleAlign: 'center',
      //       headerStyle: { backgroundColor: '#E99D42' },
      //       headerTintColor: 'white',
      //     }}
      //   />
      //   <Stack.Screen
      //     name="Details"
      //     component={DetailedNote}
      //     options={{
      //       title: 'NOTES DETAILS',
      //       headerTitleAlign: 'center',
      //       headerStyle: { backgroundColor: '#E99D42' },
      //       headerTintColor: 'white',
      //     }}
      //   />
      //   <Stack.Screen
      //     name="Profile"
      //     component={ProfileScreen}
      //     options={{
      //       title: 'USER PROFILE',
      //       headerTitleAlign: 'center',
      //       headerStyle: { backgroundColor: '#E99D42' },
      //       headerTintColor: 'white',
      //     }}
      //   />
      //   <Stack.Screen
      //     name="Home"
      //     component={HomeScreen}
      //     options={{
      //       title: 'HOME',
      //       headerTitleAlign: 'center',
      //       headerStyle: { backgroundColor: '#E99D42' },
      //       headerTintColor: 'white',
      //     }}
      //   />
      //   {/* <Stack.Screen
      //     name="SignUp"
      //     component={SignUpScreen}
      //     options={{
      //       title: 'SIGN UP',
      //       headerTitleAlign: 'center',
      //       headerStyle: { backgroundColor: '#E99D42' },
      //       headerTintColor: 'white',
      //     }}
      //   /> */}
      // </Stack.Navigator>

      <NavigationContainer independent={true}>
        <Tab.Navigator // SET INITIAL ROUTE TO LOGIN
          initialRouteName="Home" 
          tabBarOptions={{
            activeTintColor: '#4CAF50', // Set the color for the selected tab
            labelStyle: {
              fontSize: 12, // Set the font size for the tab labels
            },
          }}
          > 
          <Tab.Screen
            name="Notes"
            component={Notes}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="note" color={color} size={size} />
              ),
              headerTitleAlign: 'center'
            }}
          />
          <Tab.Screen
            name="To-Do Lists"
            component={ListsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="list" color={color} size={size} />
              ),
              headerTitleAlign: 'center'
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" color={color} size={size} />
              ),
              headerTitleAlign: 'center'
            }}
          />
          <Tab.Screen
            name="Recordings"
            component={AudioScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="audiotrack" color={color} size={size} />
              ),
              headerTitleAlign: 'center'
            }}
          />
          <Tab.Screen
            name="Clock"
            component={StatisticsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="access-time" color={color} size={size} />
              ),
              title: 'Clock', 
              headerTitleAlign: 'center'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

