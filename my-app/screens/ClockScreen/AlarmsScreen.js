import React from 'react';
import {
  Text,
  View,
  TextInput,
  Switch,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from './DateTimePickerModal'; // Update the path
import styles from './styles'; // Update the path

const AlarmsSection = (props) => {
  const {
    alarms,
    newAlarm,
    showAlarmPicker,
    selectedAlarmTime,
    addAlarm,
    toggleAlarm,
    removeAlarm, // Add this prop
    setShowAlarmPicker,
    setSelectedAlarmTime,
  } = props;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>Alarms</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Set new alarm"
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
              addAlarm();
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
            <Text>{`${item.time}`}</Text>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleAlarm(index)}
              thumbColor={item.enabled ? '#4CAF50' : '#ccc'}
            />
            <TouchableOpacity onPress={() => removeAlarm(index)}>
              <Text style={{ color: 'red', marginLeft: 10 }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default AlarmsSection;
