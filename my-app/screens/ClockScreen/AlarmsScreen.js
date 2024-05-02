import React from 'react';
import {
  Text,
  View,
  TextInput,
  Switch,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from './DateTimePickerModal'; 
import styles from './styles';

const AlarmsSection = (props) => {
  const {
    alarms,
    newAlarm,
    newAlarmTitle,
    setNewAlarmTitle,
    showAlarmPicker,
    selectedAlarmTime,
    addAlarm,
    toggleAlarm,
    removeAlarm,
    setShowAlarmPicker,
    setSelectedAlarmTime,
  } = props;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Alarms</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newAlarmTitle}
          onChangeText={(text) => setNewAlarmTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Select time"
          value={newAlarm}
          onTouchStart={() => setShowAlarmPicker(true)}
        />
        {showAlarmPicker && (
          <DateTimePickerModal
            isVisible={showAlarmPicker}
            mode="time"
            is24Hour={true}
            date={selectedAlarmTime}
            onConfirm={(date) => {
              setSelectedAlarmTime(date);
              addAlarm(newAlarmTitle, date); // Ensure you are setting the title here
            }}
            onCancel={() => setShowAlarmPicker(false)}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addAlarm}>
        <Text style={styles.addButtonText}>Add Alarm</Text>
      </TouchableOpacity>
      <FlatList
        data={alarms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <View style={styles.listItem2}>
              <Text style={styles.boldText}>{`${item.title}`}</Text>
              <Text>{`${item.time}`}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleAlarm(index)}
              thumbColor={item.enabled ? '#4CAF50' : '#ccc'}
            />
            <TouchableOpacity onPress={() => removeAlarm(index)}>
              <Text style={{ color: 'red', marginLeft: 10 }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default AlarmsSection;
