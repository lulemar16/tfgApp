import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from  '../screens/auth/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};