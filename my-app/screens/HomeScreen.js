import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler'; 

export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        {/* Profile */}
        <View style={styles.profileSection}>
          {/* Profile image */}
          {/* <Image
            style={styles.profileImage}
            source={{ uri: 'URL_DE_TU_IMAGEN' }} // Sustituye 'URL_DE_TU_IMAGEN' con la URL de la imagen de perfil
          /> */}
          {/* Profile icon */}
          <Icon name="account-circle" size={60} color="#555" />
          {/* User information */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>@username</Text>
            <Text style={styles.followersCount}>1000 followers</Text>
          </View>
          {/* Botón de edición de perfil */}
          {/* <TouchableOpacity onPress={()=>props.navigation.navigate('Create')}> 
            <Icon name="pencil" size={25} color="black" />  
          </TouchableOpacity> */}
        </View>

        {/* Screen */}
        <View style={styles.restOfScreen}>
          {/* Screen content */}
          <Text>Otro contenido de la pantalla...</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Puedes ajustar el color de fondo según tus preferencias
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#F4CE98',
    borderRadius: 10,
    margin: 10    
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circular image
    marginRight: 15,
  },
  userInfo: {
    flexDirection: 'column',
    padding: 15
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  followersCount: {
    fontSize: 14,
    color: '#555',
  },
  restOfScreen: {
    flex: 1,
    padding: 20,
  },
});
