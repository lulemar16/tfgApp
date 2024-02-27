// screens/SignUpScreen.js
import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { signUp } from '../../services/AuthService';
import {useNavigation} from "@react-navigation/native";
import { Button } from '@rneui/base';

const SignUpScreen = () => {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const user = signUp(email, password);
      console.log('User signed up:', user);
      // Navigate to the next screen or perform additional actions upon successful signup
      navigation.navigate('Login')
    } catch (error) {
      console.error('Sign-up error:', error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <View style={styles.containerFather}>
      <Text style={styles.subtitle}>SIGN UP</Text>
      <TextInput style={styles.inputText} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.inputText} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.loginButton}>
                Sign up
            </Text>
        </TouchableOpacity>
      <View style={styles.container}>
        <Text>Log in into your existing account</Text>
        <Button style={styles.signUpButton} 
        onPress={()=>navigation.navigate('Login')}>
          Log in
        </Button>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  containerFather: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation:5
  },
  container: {
    padding:20
  },
  inputText: {
    borderColor: '#F4CE98',
    borderWidth: 1,
    padding: 8, 
    marginTop:10,
    borderRadius:8,
    width: '80%'
  },
  subtitle: {
    color: '#E99D42',
    fontSize:30
  },
  signUpButton: {
    backgroundColor: '#E99D42',
    borderColor: '#E99D42',
    borderWidth: 3,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  loginButton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  }
})