import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import YouTubePlayer from 'react-native-youtube-iframe';
import CarouselComponent from './CarrouselImages';
import {useNavigation} from "@react-navigation/native";
import { Button } from '@rneui/base';

import { onAuthStateChanged } from '@firebase/auth';
import { getAuth } from 'firebase/auth';


const auth = getAuth();

export default function HomeScreen() {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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
              source={{ uri: auth.currentUser.photoURL }} // Replace 'URL_DE_TU_IMAGEN' with the URL of your profile image
            />

            {/* User information */}
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user.email}</Text>
              <Text style={styles.followersCount}>1000 followers</Text>
            </View>
            
            <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.buttonText}>PROFILE</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileSection}>

          {/* Profile icon */}
          <Icon name="account-circle" size={70} color="#555" />

          {/* User information */}          
          <View style={styles.userInfo}>
            <Text style={styles.username}>user</Text>
            <Text style={styles.followersCount}>1000 followers</Text>
          </View>
          
          <TouchableOpacity style={styles.button} 
          onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>PROFILE</Text>
          </TouchableOpacity>
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
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  userInfo: {
    flexDirection: 'column',
    padding: 5,
    paddingLeft: '3%',
    paddingRight: '5%'
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  followersCount: {
    fontSize: 12,
    color: '#fff',
  },
  button: {
    backgroundColor: '#FCCA00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
