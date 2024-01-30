import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import YouTubePlayer from 'react-native-youtube-iframe';


export default function HomeScreen() {

  const navigation = useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profileSection}>
        {/* Profile image */}
        {/* <Image
          style={styles.profileImage}
          source={{ uri: 'URL_DE_TU_IMAGEN' }} // Replace 'URL_DE_TU_IMAGEN' with the URL of your profile image
        /> */}
        {/* Profile icon */}
        <Icon name="account-circle" size={60} color="#555" />
        {/* User information */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>@username</Text>
          <Text style={styles.followersCount}>1000 followers</Text>
        </View>
        {/* Edit profile button */}
        {/* <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen.js')}> 
          <View style={styles.editButton}>
            <Icon name="pencil" size={25} color="black" />
          </View>
        </TouchableOpacity> */}
      </View>

      {/* Video Section */}
      <View style={styles.videoSection}>
        <YouTubePlayer
        height={315}
        play= {true}
        videoId='_tV5LEBDs7w'>
        </YouTubePlayer>
      </View>


      {/* Rest of the Screen */}
      <View style={styles.restOfScreen}>
        {/* Screen content */}
        <Text>Other screen content...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'column',
    padding: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  followersCount: {
    fontSize: 14,
    color: '#fff',
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',  // Or any color you prefer
  },
  videoSection: {
    flex: 1,
    backgroundColor: '#000',  // Background color of the video section
    margin: 10
  },
  restOfScreen: {
    flex: 1,
    padding: 20,
  },
});
