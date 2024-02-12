import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ListsScreen from './screens/NotesScreen/ListsScreen'; 
import AudioScreen from './screens/RecordingsScreen.js/AudioScreen'; 
import ClockScreen from './screens/ClockScreen/ClockScreen';
import Notes from './screens/NotesScreen/Notes';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';


export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        activeTintColor='#E99D42'
        screenOptions={{
          activeTintColor: '#E99D42', 
          labelStyle: {
            fontSize: 12,
          },
        }}
      > 
        <Tab.Screen
          name="Notes"
          component={Notes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="border-color" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Clock"
          component={ClockScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="access-time" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Recordings"
          component={AudioScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="audiotrack" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
