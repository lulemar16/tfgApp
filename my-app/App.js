import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import LoginScreen from './screens/auth/LoginScreen'

export default function App() {

  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      {/* <LoginScreen/> */}
      <AuthNavigator/>
      {/* <MainNavigator/> */}
      {/* {user ? <MainNavigator /> : <AuthNavigator />} */}
    </NavigationContainer>
  );
};

