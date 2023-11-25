// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Touchable } from 'react-native';
// import { logIn } from '../services/AuthService';
import { Text } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await logIn(email, password);
      console.log('User logged in:', user);
      // Navigate to the next screen or perform additional actions upon successful signup
      props.navigation.navigate('Notes')
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity onPress={handleLogin}>
            <Text>
                Login
            </Text>
        </TouchableOpacity>
      <View>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate('SignUp')}>
            <Text>
                Sign up
            </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default LoginScreen;
