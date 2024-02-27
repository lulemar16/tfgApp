import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import YouTubePlayer from 'react-native-youtube-iframe';
import CarouselComponent from './CarrouselImages';
import {useNavigation} from "@react-navigation/native";
import { Button } from '@rneui/base';

import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../services/AuthService'; 

export default function HomeScreen() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log('USER:', user)
      if (user) {
        console.log('EMAIL:', user.email)
        console.log('url:', user.photoURL)
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Profile */}
      {user ? (
        <View style={styles.profileSection}>

            {/* Profile image */}
            <Image
              style={styles.profileImage}
              source={{ uri: user.photoURL }} // Replace 'URL_DE_TU_IMAGEN' with the URL of your profile image
            />

            {/* User information */}
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user.email}</Text>
              <Text style={styles.followersCount}>1000 followers</Text>
            </View>
            
            <Button style={styles.profileButton} 
            onPress={() => navigation.navigate('Profile')}>
              PROFILE
            </Button>
        </View>
      ) : (
        <View style={styles.profileSection}>

          {/* Profile icon */}
          {/* <Icon name="account-circle" size={70} color="#555" /> */}

          {/* User information */}          
          <View style={styles.userInfo}>
            <Text style={styles.username}>user</Text>
            <Text style={styles.followersCount}>1000 followers</Text>
          </View>
          
          <Button style={styles.profileButton} 
          onPress={() => navigation.navigate('Profile')}>
            PROFILE
          </Button>
      </View>
      )}

      {/* Video Section */}
      <View style={styles.videoSection}>
        <YouTubePlayer 
        height={210} 
        play={false} 
        videoId='_tV5LEBDs7w' />
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselSection}>
        <CarouselComponent />
      </View>

      {/* Video Section */}
      <View style={styles.videoSection}>
        <YouTubePlayer 
        height={210} 
        play={false} 
        videoId='EhLhE8865tU' />
      </View>

      {/* Rest of the Screen */}
      <View style={styles.restOfScreen}>
        {/* Screen content */}
        <Text>Other screen content...</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#E99D42',
    backgroundColor: '#E99D42',
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
    paddingLeft: '10%',
    paddingRight: '10%'
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
  profileButton: {
    backgroundColor: '#E99D42',
    padding: 1,
    borderRadius: 5,
  },
  videoSection: {
    backgroundColor: '#000',
    margin: 10,
  },
  carouselSection: {
    margin: 10,
    height: 200,
  },
  restOfScreen: {
    flex: 1,
    padding: 20,
  },
});
