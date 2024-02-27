import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotesScreen from '../screens/NotesScreen/Notes';
import AudioScreen from '../screens/RecordingsScreen/AudioScreen';
import ClockScreen from '../screens/ClockScreen/ClockScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import HomeStackScreen from '../stacks/HomeStack';
import NotesStackScreen from '../stacks/NotesStack';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return(
    <Tab.Navigator
      initialRouteName="NiM"
      activeTintColor="#E99D42"
      screenOptions={{
        activeTintColor: '#E99D42',
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Workspace"
        component={NotesStackScreen}
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
        name="NiM"
        component={HomeStackScreen}
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
  );
};