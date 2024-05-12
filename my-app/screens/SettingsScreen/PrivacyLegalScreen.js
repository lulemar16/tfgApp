import { Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function PrivacyLegalScreen() {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleInfo}>
        <Text style={styles.header}>Privacy & Legal</Text>
      </TouchableOpacity>
      {showInfo && (
        <View style={styles.contactInfo}>
            <View style={styles.row}>
                <Icon name="info-circle" size={20} color="#333" style={styles.icon} />
                <Text style={styles.info}>For detailed information on our privacy policies and legal terms, please visit:</Text>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.privacypolicies.com/live/7c13b9f1-9cb1-41e6-a8fd-547edd9759b5")}>
                <Text style={[styles.info, {color: 'blue'}]}>https://www.privacypolicies.com/live/7c13b9f1-9cb1-41e6-a8fd-547edd9759b5</Text>
            </TouchableOpacity>
        </View>      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
