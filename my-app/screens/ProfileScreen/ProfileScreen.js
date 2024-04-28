import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { logOut } from '../../services/AuthService'; 
import { updatePassword, getAuth, updateProfile } from '@firebase/auth';
import { EmailAuthProvider, reauthenticateWithCredential } from '@firebase/auth';

import { Alert } from 'react-native';

const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "";

export default function ProfileScreen({navigation} ) {

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [user, setUser] = useState(null);

  const handleChangePassword = async () => {
    try {
      // Check if the user is authenticated
      if (user) {
        // Re-authenticate the user before changing the password
        // You need to prompt the user to enter their current password again
        const credentials = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        
        await reauthenticateWithCredential(auth.currentUser, credentials);
  
        // Now that the user is re-authenticated, update the password
        await updatePassword(auth.currentUser, newPassword);
        
        // Clear the password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
  
        Alert.alert('Success', 'Password updated successfully!');
      } else {
        console.error('User not authenticated.');
      }
    } catch (error) {
      console.error('Change password error:', error.message);
      Alert.alert('Error', `Failed to update password: ${error.message}`);
    }
  };

  const handleLogOut = async () => {
    auth
    .signOut()
    .then (() => navigation.navigate("Login"))
    .catch(error => alert(error.message));
  };

  const pickImage = async () => {
    // Request permission to access the image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const cleanedUrl = result.assets[0].uri.replace(/^file:\/\//, ''); 

    updateProfile(auth.currentUser, { photoURL: `${result.assets[0].uri}` })
      .then(() => {
          setProfileImage(result.assets[0].uri);
          console.log("success: ", result.assets[0].uri);
    }).catch((error) => { console.log(error); });

  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureSection}>
        {/* Profile icon */}
        {/* <Icon name="account-circle" size={150} color="#555" /> */}
        {/* Profile image */}
        <Image source={{ uri: auth.currentUser.photoURL }} style={styles.profileImage} /> 
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.changePictureButton} onPress={pickImage}>
            <Text style={styles.changePictureButtonText}>Change photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.changePictureButton}>
            <Text style={styles.changePictureButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Information Section */}
      <View style={styles.userInfoSection}>
        <Text style={styles.userInfoLabel}>Email: {auth.currentUser?.email}</Text>
      </View>

      {/* Change Password Section */}
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat New Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <Button style={styles.button} title="Change Password" onPress={handleChangePassword} />

      {/* Logout Section */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
    margin:20
  },
  buttonSection:{
    flexDirection: 'row'
  },
  changePictureButton: {
    margin: 10,
    backgroundColor: '#E99D42',
    padding: 10,
    borderRadius: 5,
  },
  changePictureButtonText: {
    color: 'white',
  },
  userInfoSection: {
    marginBottom: 20,
    justifyContent: 'left',
    marginLeft: 2,
    fontSize: 18
  },
  userInfoLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  button: {
    width: '80%',
    backgroundColor: '#E99D42',
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 20
  },
  logoutButtonText: {
    color: '#E99D42', 
  },
});

