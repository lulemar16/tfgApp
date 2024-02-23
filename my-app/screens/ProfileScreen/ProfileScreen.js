import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({navigation} ) {

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleChangePassword = () => {
    // Implement password change logic using Firebase Authentication
  };

  const handleLogOut = async () => {
    try {
      // Implement logOut logic using Firebase Authentication or your preferred method
      // await logOut();
      // Navigate to the login screen or any other desired screen upon successful logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
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

    console.log(result);

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureSection}>
        {/* Profile icon */}
        {/* <Icon name="account-circle" size={150} color="#555" /> */}
        {/* Profile image */}
        <Image source={{ uri: profileImage }} style={styles.profileImage} /> 
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
        <Text style={styles.userInfoLabel}>Name: John Doe</Text>
        <Text style={styles.userInfoLabel}>Username: @johndoe</Text>
        <Text style={styles.userInfoLabel}>Email: email@johndoe.com</Text>
        <Text style={styles.userInfoLabel}>Gender: Male</Text>
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
    width: 200,
    height: 200,
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

