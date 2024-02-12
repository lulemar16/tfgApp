import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DateTimePickerModal from './DateTimePickerModal';
import styles from './styles'; 

const TimersSection = (props) => {
    const { timers, newTimer, addTimer, toggleTimer, setNewTimer, removeTimer } = props;
  
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Timers</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Set new timer (hh:mm:ss)"
            value={newTimer}
            onChangeText={(text) => setNewTimer(text)}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addTimer}>
          <Text style={styles.addButtonText}>Add Timer</Text>
        </TouchableOpacity>
        <FlatList
          data={timers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text>{`${item.time}`}</Text>
              <TouchableOpacity
                style={styles.timerButton}
                onPress={() => toggleTimer(index)}
              >
                <Text style={styles.timerButtonText}>
                  {item.paused ? 'Start' : 'Pause'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTimer(index)}>
                <Text style={{ color: 'red', marginLeft: 10 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };
  
  export default TimersSection;
