import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureSection}>
        <Image source={{ uri: 'user-profile-photo-url' }} style={styles.profileImage} />
        <TouchableOpacity style={styles.changePictureButton}>
          <Text style={styles.changePictureButtonText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      {/* User Information Section */}
      <View style={styles.userInfoSection}>
        <Text style={styles.userInfoLabel}>Name: John Doe</Text>
        <Text style={styles.userInfoLabel}>Username: @johndoe</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePictureButton: {
    marginLeft: 20,
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
    marginLeft: 2
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
  },
  logoutButtonText: {
    color: '#E99D42', // Change the color as needed
  },
});

export default ProfileScreen;
