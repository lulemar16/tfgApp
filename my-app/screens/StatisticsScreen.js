import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  Switch,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

export default class ClockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: [],
      timers: [],
      newAlarm: '',
      newTimer: '',
      showAlarmPicker: false,
      showTimerPicker: false,
      selectedAlarmTime: new Date(),
      selectedTimerTime: new Date(),
    };
  }

  componentDidMount() {
    this.timerInterval = setInterval(this.updateTimers, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  addTimer = () => {
    const { timers, newTimer } = this.state;
    // Validate the input to match the hh:mm:ss format
    const timerRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timerRegex.test(newTimer)) {
      alert('Invalid timer format. Please use hh:mm:ss');
      return;
    }

    this.setState({
      timers: [
        ...timers,
        { initialTime: newTimer, time: newTimer, type: 'timer', paused: true },
      ],
      showTimerPicker: false,
      newTimer: '',
    });
  };

  updateTimers = () => {
    const { timers } = this.state;
    const updatedTimers = timers.map((timer, index) => {
      if (!timer.paused) {
        const [hours, minutes, seconds] = timer.time.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        totalSeconds = Math.max(0, totalSeconds - 1);

        if (totalSeconds === 0) {
          // Timer countdown finished, reset it to the initial time and set it to paused
          const initialTime = timer.initialTime;
          this.toggleTimer(index);
          return { ...timer, time: initialTime };
        }

        const newTime = dayjs()
          .startOf('day')
          .add(totalSeconds, 'seconds')
          .format('HH:mm:ss');
        return { ...timer, time: newTime };
      }
      return timer;
    });

    this.setState({ timers: updatedTimers });
  };

  addAlarm = () => {
    const { alarms, selectedAlarmTime } = this.state;
    const newAlarmTime = dayjs(selectedAlarmTime).format('HH:mm');
    this.setState({
      alarms: [
        ...alarms,
        { time: newAlarmTime, type: 'alarm', enabled: true },
      ],
      showAlarmPicker: false,
      newAlarm: '',
    });
  };

  toggleAlarm = (index) => {
    const { alarms } = this.state;
    const updatedAlarms = [...alarms];
    updatedAlarms[index].enabled = !updatedAlarms[index].enabled;
    this.setState({ alarms: updatedAlarms });
  };

  toggleTimer = (index) => {
    const { timers } = this.state;
    const updatedTimers = [...timers];
    updatedTimers[index].paused = !updatedTimers[index].paused;
    this.setState({ timers: updatedTimers });
  };

  render() {
    const {
      alarms,
      timers,
      newAlarm,
      newTimer,
      showAlarmPicker,
      showTimerPicker,
      selectedAlarmTime,
      selectedTimerTime,
    } = this.state;

    return (
      <View style={styles.container}>

        {/* Alarm Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Alarms</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Set new alarm"
              value={newAlarm}
              onTouchStart={() => this.setState({ showAlarmPicker: true })}
            />
            {showAlarmPicker && (
              <DateTimePickerModal
                isVisible={showAlarmPicker}
                mode="time"
                is24Hour={true}
                date={selectedAlarmTime}
                onConfirm={(date) => {
                  this.setState({ selectedAlarmTime: date });
                  this.addAlarm();
                }}
                onCancel={() => this.setState({ showAlarmPicker: false })}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={this.addAlarm}
          >
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
                  onValueChange={() => this.toggleAlarm(index)}
                />
              </View>
            )}
          />
        </View>

        {/* Timer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Timers</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Set new timer (hh:mm:ss)"
              value={newTimer}
              onChangeText={(text) => this.setState({ newTimer: text })}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={this.addTimer}
          >
            <Text style={styles.addButtonText}>Add Timer</Text>
          </TouchableOpacity>
          <FlatList
            data={timers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text>{`${item.time}`}</Text>
                <Button
                  title={item.paused ? 'Start' : 'Pause'}
                  onPress={() => this.toggleTimer(index)}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginLeft:'40%'
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
};
