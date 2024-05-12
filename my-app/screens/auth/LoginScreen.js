import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { logIn } from '../../services/AuthService';
import {useNavigation} from "@react-navigation/core";
import { Button, Text } from '@rneui/base';
import logo from '../../assets/logoFF.png';

const LoginScreen = (props) => {

  const navigation = useNavigation();
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home")
      }
    })
    return unsubscribe
  }, []);

  const handleLogin = async () => {
    logIn(email, password)
    .then(() => {
      console.log('User logged in:', email);
    })
    .catch(error => {
      console.group(error)
      Alert.alert(error.message)
    });
  };

  return (
    <View style={styles.containerFather}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />
      <Text style={styles.subtitle}>LOGIN</Text>
      <TextInput style={styles.inputText} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.inputText} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
            <Text style={styles.loginButton}>
                Login
            </Text>
        </TouchableOpacity>
      <View style={styles.container}>
        <Text>Don't have an account yet?</Text>
        <Button style={styles.signUpButton} 
        onPress={() => navigation.navigate('Signup')}>
            Sign-up
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

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
  },
  logo: {
    width: 150, 
    height: 150,
    marginBottom: 20 
  }
})
