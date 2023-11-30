// AppNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <View>
        <Text>ListsScreen</Text>
    </View>
  );
};

export default AppNavigator;
