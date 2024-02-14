import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AlarmsSection from './AlarmsScreen';
import TimersSection from './TimersScreen';
import DeadlinesSection from './DeadlinesScreen';
import CustomDateTimePickerModal from './DateTimePickerModal'; // Update the path
import styles from './styles'; // Update the path
import dayjs from 'dayjs';
// import { ScrollView, GestureHandlerRootView  } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-virtualized-view'

const ClockScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [timers, setTimers] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [newAlarm, setNewAlarm] = useState('');
  const [newAlarmTitle, setNewAlarmTitle] = useState('');
  const [newTimer, setNewTimer] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [showAlarmPicker, setShowAlarmPicker] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [selectedAlarmTime, setSelectedAlarmTime] = useState(new Date());
  const [selectedTimerTime, setSelectedTimerTime] = useState(new Date());
  const [selectedDeadlineTime, setSelectedDeadlineTime] = useState(new Date());

  useEffect(() => {
    const timerInterval = setInterval(updateTimers, 1000);
    return () => clearInterval(timerInterval);
  }, [timers]);

  const addAlarm = () => {
    const newAlarmTime = dayjs(selectedAlarmTime).format('HH:mm');
    setAlarms([
      ...alarms,
      { title: newAlarmTitle, time: newAlarmTime, type: 'alarm', enabled: true },
    ]);
    setShowAlarmPicker(false);
    setNewAlarm('');
    setNewAlarmTitle('');
  };
  

  const toggleAlarm = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms[index].enabled = !updatedAlarms[index].enabled;
    setAlarms(updatedAlarms);
  };

  const removeAlarm = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(index, 1);
    setAlarms(updatedAlarms);
  };

  const addTimer = () => {
    const timerRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timerRegex.test(newTimer)) {
      alert('Invalid timer format. Please use hh:mm:ss');
      return;
    }

    setTimers([
      ...timers,
      { initialTime: newTimer, time: newTimer, type: 'timer', paused: true },
    ]);
    setShowTimerPicker(false);
    setNewTimer('');
  };

  const updateTimers = () => {
    const updatedTimers = timers.map((timer, index) => {
      if (!timer.paused) {
        const [hours, minutes, seconds] = timer.time.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        totalSeconds = Math.max(0, totalSeconds - 1);

        if (totalSeconds === 0) {
          const initialTime = timer.initialTime;
          toggleTimer(index);
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

    setTimers(updatedTimers);
  };

  const toggleTimer = (index) => {
    const updatedTimers = [...timers];
    updatedTimers[index].paused = !updatedTimers[index].paused;
    setTimers(updatedTimers);
  };

  const removeTimer = (index) => {
    const updatedTimers = [...timers];
    updatedTimers.splice(index, 1);
    setTimers(updatedTimers);
  };

  const addDeadline = () => {
    const newDeadlineTime = dayjs(selectedDeadlineTime).format('HH:mm');
    setDeadlines([
      ...deadlines,
      { time: newDeadlineTime, type: 'deadline', enabled: true },
    ]);
    setShowDeadlinePicker(false);
    setNewDeadline('');
  };

  const toggleDeadline = (index) => {
    const updatedDeadlines = [...deadlines];
    updatedDeadlines[index].enabled = !updatedDeadlines[index].enabled;
    setDeadlines(updatedDeadlines);
  };

  const removeDeadline = (index) => {
    const updatedDeadlines = [...deadlines];
    updatedDeadlines.splice(index, 1);
    setDeadlines(updatedDeadlines);
  };

  return (
      <View style={styles.container}>
        <AlarmsSection
          alarms={alarms}
          newAlarm={newAlarm}
          newAlarmTitle={newAlarmTitle} 
          setNewAlarmTitle={setNewAlarmTitle}
          showAlarmPicker={showAlarmPicker}
          selectedAlarmTime={selectedAlarmTime}
          addAlarm={addAlarm}
          removeAlarm={removeAlarm}
          toggleAlarm={(index) => toggleAlarm(index)}
          setShowAlarmPicker={setShowAlarmPicker}
          setSelectedAlarmTime={setSelectedAlarmTime}
        />
        <TimersSection
          timers={timers}
          newTimer={newTimer}
          addTimer={addTimer}
          removeTimer={removeTimer}
          toggleTimer={(index) => toggleTimer(index)}
          setNewTimer={setNewTimer}
        />
        <DeadlinesSection
          deadlines={deadlines}
          newDeadline={newDeadline}
          showDeadlinePicker={showDeadlinePicker}
          selectedDeadlineTime={selectedDeadlineTime}
          addDeadline={addDeadline}
          removeDeadline={removeDeadline}
          toggleDeadline={(index) => toggleDeadline(index)}
          setShowDeadlinePicker={setShowDeadlinePicker}
        />
      </View>
  );
};

export default ClockScreen;
