import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function ContactScreen() {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleContactInfo}>
        <Text style={styles.header}>Contact Support</Text>
      </TouchableOpacity>
      {showContactInfo && (
        <View style={styles.contactInfo}>
          <View style={styles.row}>
            <Icon name="envelope" size={20} style={styles.icon} />
            <Text style={styles.info}>support@nim.com</Text>
          </View>

          <View style={styles.row}>
            <Icon name="phone" size={20} style={styles.icon} />
            <Text style={styles.info}>(123) 456-7890</Text>
          </View>

          <View style={styles.row}>
            <Icon name="home" size={20} style={styles.icon} />
            <Text style={styles.info}>Castellana 78, Madrid, Spain</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FCCA00',
    backgroundColor: '#FCCA00',
    color: 'white',
    padding: 10,
    borderRadius: 12
  },
  contactInfo: {
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  info: {
    fontSize: 16,
  },
});
