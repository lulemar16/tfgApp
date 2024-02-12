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
import dayjs from 'dayjs';

const DeadlinesSection = (props) => {
    const {
      deadlines,
      newDeadline,
      showDeadlinePicker,
      selectedDeadlineTime,
      addDeadline,
      toggleDeadline,
      setShowDeadlinePicker,
      removeDeadline,
    } = props;
  
    const formatDeadline = (date) => {
      return dayjs(date).format('DD.MM.YYYY [at] HH:mm');
    };
  
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Deadlines</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Set new deadline"
            value={newDeadline}
            onTouchStart={() => setShowDeadlinePicker(true)}
          />
          {showDeadlinePicker && (
            <DateTimePickerModal
              isVisible={showDeadlinePicker}
              mode="datetime"
              is24Hour={true}
              date={selectedDeadlineTime}
              onConfirm={(date) => {
                setShowDeadlinePicker(false);
                addDeadline(date);
              }}
              onCancel={() => setShowDeadlinePicker(false)}
            />
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => addDeadline(selectedDeadlineTime)}>
          <Text style={styles.addButtonText}>Add Deadline</Text>
        </TouchableOpacity>
        <FlatList
          data={deadlines}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text>{formatDeadline(item.time)}</Text>
              <Switch
                value={item.enabled}
                onValueChange={() => toggleDeadline(index)}
                thumbColor={item.enabled ? '#4CAF50' : '#ccc'}
              />
              <TouchableOpacity onPress={() => removeDeadline(index)}>
                <Text style={{ color: 'red', marginLeft: 10 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };
  
  export default DeadlinesSection;
