// screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
// import { signUp } from '../services/AuthService';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password);
      console.log('User signed up:', user);
      // Navigate to the next screen or perform additional actions upon successful signup
    } catch (error) {
      console.error('Sign-up error:', error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
