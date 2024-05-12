import React, { useState } from 'react';
import { Text, StyleSheet, View, Switch, FlatList, TouchableOpacity } from 'react-native';
import ContactScreen from './ContactScreen';
import PrivacyLegalScreen from './PrivacyLegalScreen';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(true);
  const [language, setLanguage] = useState('English');
  const [autoPlayVideos, setAutoPlayVideos] = useState(true);
  const [downloadOverWiFi, setDownloadOverWiFi] = useState(true);
  const [fontSize, setFontSize] = useState('Medium');
  const [showImages, setShowImages] = useState(true);
  const [sendUsageData, setSendUsageData] = useState(false);

  const settingsData = [
    { id: '1', title: 'Dark Mode', value: darkMode, onChange: setDarkMode },
    { id: '2', title: 'Notifications', value: notification, onChange: setNotification },
    { id: '3', title: 'Language', value: language, onChange: setLanguage },
    { id: '4', title: 'Auto-play Videos', value: autoPlayVideos, onChange: setAutoPlayVideos },
    { id: '5', title: 'Download over WiFi only', value: downloadOverWiFi, onChange: setDownloadOverWiFi },
    { id: '6', title: 'Font Size', value: fontSize, onChange: setFontSize },
    { id: '8', title: 'Send Usage Data', value: sendUsageData, onChange: setSendUsageData },
    // Add more settings as needed
  ];

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity onPress={() => typeof item.value === 'boolean' && item.onChange(!item.value)}>
      <View style={styles.settingItem}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        {typeof item.value === 'boolean' ? (
          <Switch 
            value={item.value} 
            onValueChange={(newValue) => item.onChange(newValue)} 
            trackColor={{ false: "#767577", true: "#F4CE98" }}
            thumbColor={item.value ? "#FFBF6B" : "#FFBF6B"}/>
        ) : (
          <Text>{item.value}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView>
    <ScrollView>
    <View style={styles.container}>
      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id}
        renderItem={renderSettingItem}
      />
      <View style={styles.container2}>
        <ContactScreen></ContactScreen>
        <PrivacyLegalScreen></PrivacyLegalScreen>
      </View>
    </View>
    </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container2: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  settingTitle: {
    fontSize: 16,
  },
});
