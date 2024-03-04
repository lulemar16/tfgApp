import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from  '../screens/auth/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MainNavigator from './MainNavigator';

const authNav = createMaterialTopTabNavigator();

export default function AuthNavigator() {
  return(
    <authNav.Navigator>
      <authNav.Screen name="Login" component={LoginScreen} />
      <authNav.Screen name="Signup" component={SignUpScreen} />
    </authNav.Navigator>
  );
};