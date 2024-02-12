// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
// import { logOut } from '../services/AuthService';

const ProfileScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    // Implement password change logic using Firebase Authentication
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      // Navigate to the login screen or any other desired screen upon successful logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <View>
      {/* User Information */}
      <Image source={{ uri: 'user-profile-photo-url' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      
      {/* changing the password */}
      <TextInput
        placeholder="New Password"
        secureTextEntry
        onChangeText={setNewPassword}
      />

      {/* Button to change the password */}
      <Button title="Change Password" onPress={handleChangePassword} />

      {/* log out */}
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
