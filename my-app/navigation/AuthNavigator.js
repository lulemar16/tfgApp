import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from  '../screens/auth/SignUpScreen';

const authNav = createStackNavigator();

export default function AuthNavigator() {
  return(
    <authNav.Navigator screenOptions={{headerShown: false}}>
      <authNav.Screen name="Login" component={LoginScreen} />
      <authNav.Screen name="Signup" component={SignUpScreen} />
    </authNav.Navigator>
  );
};