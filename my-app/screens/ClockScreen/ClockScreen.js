import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Button, Alert } from 'react-native';
import AlarmsSection from './AlarmsScreen';
import TimersSection from './TimersScreen';
import DeadlinesSection from './DeadlinesScreen';
import CustomDateTimePickerModal from './DateTimePickerModal'; 
import styles from './styles'; 
import dayjs from 'dayjs';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "anonymous";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ClockScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [timers, setTimers] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [newAlarm, setNewAlarm] = useState('');
  const [newAlarmTitle, setNewAlarmTitle] = useState('');
  const [newTimer, setNewTimer] = useState('');
  const [timerInterval, setTimerInterval] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newDeadlineTitle, setNewDeadlineTitle] = useState('');
  const [showAlarmPicker, setShowAlarmPicker] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [selectedAlarmTime, setSelectedAlarmTime] = useState(new Date());
  const [selectedTimerTime, setSelectedTimerTime] = useState(new Date());
  const [selectedDeadlineTime, setSelectedDeadlineTime] = useState(new Date());
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const alarmsRef = collection(doc(db, 'users', userUID), 'alarms');
  const timersRef = collection(doc(db, 'users', userUID), 'timers');  
  const deadlinesRef = collection(doc(db, 'users', userUID), 'deadlines');

  useEffect(() => {
    const fetchDataAndRemovePassedDeadlines = async () => {
      // Fetch data for alarms, timers, and deadlines
      const alarmsSnapshot = await getDocs(alarmsRef);
      const alarmsData = alarmsSnapshot.docs.map(doc => doc.data());
      const timersSnapshot = await getDocs(timersRef);
      const timersData = timersSnapshot.docs.map(doc => doc.data());
      const deadlinesSnapshot = await getDocs(deadlinesRef);
      const deadlinesData = deadlinesSnapshot.docs.map(doc => doc.data());
      
      // Set the state for alarms, timers, and deadlines
      setAlarms(alarmsData);
      setTimers(timersData);
      setDeadlines(deadlinesData);
  
      // Remove passed deadlines
      const now = dayjs();
      const updatedDeadlines = [];
      for (const deadline of deadlinesData) {
        const jsDate = new Date(deadline.time.seconds * 1000);
        const deadlineTime = dayjs(jsDate);
        if (now.isBefore(deadlineTime)) {
          updatedDeadlines.push(deadline);
        }
      }
      setDeadlines(updatedDeadlines);
    };
  
    fetchDataAndRemovePassedDeadlines();
  }, []);

  const addAlarm = async (title, time) => {
    setShowAlarmPicker(false);
    const newAlarmTime = dayjs(time).format('HH:mm');
    const docRef = await addDoc(alarmsRef, { 
      title: title, 
      time: newAlarmTime, 
      type: 'alarm', 
      enabled: true 
    });
    console.log("Document written with ID: ", docRef.id);
    updateDoc(docRef, {
      id : docRef.id
    })
    setAlarms([
      ...alarms,
      { title: title, time: newAlarmTime, type: 'alarm', enabled: true, id: docRef.id },
    ]);
    setNewAlarm('');
    setNewAlarmTitle('');
    setSelectedAlarmTime(new Date());
  };
  

  const toggleAlarm = async (index) => {
    const alarmToUpdate = alarms[index];
    const alarmDocRef = doc(alarmsRef, alarmToUpdate.id);
    const newEnabledValue = !alarmToUpdate.enabled;
  
    if (alarmToUpdate.enabled) {
      await updateDoc(alarmDocRef, {
        enabled: false
      });
    }  else {
      await updateDoc(alarmDocRef, {
        enabled: true
      });
    }
    // Update the alarms state with the toggled value
    const updatedAlarms = [...alarms];
    updatedAlarms[index].enabled = newEnabledValue;
    setAlarms(updatedAlarms);
  };

  const removeAlarm = async (index) => {
    const alarmToRemove = alarms[index];
    const alarmDocRef = doc(alarmsRef, alarmToRemove.id);
    await deleteDoc(alarmDocRef);
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(index, 1);
    setAlarms(updatedAlarms);
  };

  const addTimer = async () => {
    clearInterval(timerInterval);
    const timerRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timerRegex.test(newTimer)) {
      alert('Invalid timer format. Please use hh:mm:ss');
      return;
    }
    const docRef = await addDoc(timersRef, { 
      initialTime: newTimer, 
      time: newTimer, 
      type: 'timer', 
      paused: true 
    });
    console.log("Document written with ID: ", docRef.id);
    updateDoc(docRef, {
      id : docRef.id
    })
    setTimers([
      ...timers,
      { initialTime: newTimer, time: newTimer, type: 'timer', paused: true, id: docRef.id },
    ]);
    setNewTimer('');
    const newTimerInterval = setInterval(updateTimers, 1000);
    setTimerInterval(newTimerInterval);
  };

  const updateTimers = async () => {
    const updatedTimers = timers.map(async (timer, index) => {
      if (!timer.paused) {
        const [hours, minutes, seconds] = timer.time.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        totalSeconds = Math.max(0, totalSeconds - 1);
  
        if (totalSeconds === 0) {
          const initialTime = timer.initialTime;
          await toggleTimer(index);
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
  
    const updatedTimersData = await Promise.all(updatedTimers);
    setTimers(updatedTimersData);
  };  
  
  
  const toggleTimer = async (index) => {
    const timerToUpdate = timers[index];
    const timerDocRef = doc(timersRef, timerToUpdate.id);
    const newPausedValue = !timerToUpdate.paused;
  
    await updateDoc(timerDocRef, {
      paused: newPausedValue
    });
  
    const updatedTimers = [...timers];
    updatedTimers[index].paused = newPausedValue;
    setTimers(updatedTimers);
  };
  

  const removeTimer = async (index) => {
    const timerToRemove = timers[index];
    const timerDocRef = doc(timersRef, timerToRemove.id);
    await deleteDoc(timerDocRef);
    const updatedTimers = [...timers];
    updatedTimers.splice(index, 1);
    setTimers(updatedTimers);
  };

  const addDeadline = async (title, time) => {
    setShowDeadlinePicker(false);
    const newDeadlineTime = dayjs(time);
    const docRef = await addDoc(deadlinesRef, { 
      title: title,
      time: time, 
      type: 'deadline'
    });
    console.log("Document written with ID: ", docRef.id);
    updateDoc(docRef, {
      id : docRef.id
    })
    setDeadlines([
      ...deadlines,
      { title: title, time: newDeadlineTime, type: 'deadline', id: docRef.id},
    ]);
    setShowDeadlinePicker(false);
    setNewDeadline('');
    setNewDeadlineTitle('');
    setSelectedDeadlineTime(new Date());
  };

  const removeDeadline = async (index) => {
    const deadlineToRemove = deadlines[index];
    const deadlineDocRef = doc(deadlinesRef, deadlineToRemove.id);
    await deleteDoc(deadlineDocRef);
    const updatedDeadlines = [...deadlines];
    updatedDeadlines.splice(index, 1);
    setDeadlines(updatedDeadlines);
  };

  const removeDeadlineById = async (id) => {
    const deadlineDocRef = doc(deadlinesRef, id);
    await deleteDoc(deadlineDocRef);
    const updatedDeadlines = deadlines.filter((deadline) => deadline.id !== id);
    setDeadlines(updatedDeadlines);
  };

  const confirmDeleteAlarm = (alarm) => {
    
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this alarm?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => removeAlarm(alarm) },
      ]
    );
  }

  const confirmDeleteTimer = (timer) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this timer?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => removeTimer(timer) },
      ]
    ); 
  };

  const confirmDeleteDeadline = (deadline) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this deadline?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => removeDeadline(deadline) },
      ]
    ); 
  };
 
  return (
      <ScrollView style={styles.container}>
        <AlarmsSection
          alarms={alarms}
          newAlarm={newAlarm}
          newAlarmTitle={newAlarmTitle} 
          setNewAlarmTitle={setNewAlarmTitle}
          showAlarmPicker={showAlarmPicker}
          selectedAlarmTime={selectedAlarmTime}
          addAlarm={addAlarm}
          removeAlarm={confirmDeleteAlarm}
          toggleAlarm={(index) => toggleAlarm(index)}
          setShowAlarmPicker={setShowAlarmPicker}
          setSelectedAlarmTime={setSelectedAlarmTime}
        />
        <TimersSection
          timers={timers}
          newTimer={newTimer}
          addTimer={addTimer}
          removeTimer={confirmDeleteTimer}
          toggleTimer={(index) => toggleTimer(index)}
          setNewTimer={setNewTimer}
        />
        <DeadlinesSection
          deadlines={deadlines}
          newDeadline={newDeadline}
          newDeadlineTitle={newDeadlineTitle} 
          setNewDeadlineTitle={setNewDeadlineTitle}
          showDeadlinePicker={showDeadlinePicker}
          selectedDeadlineTime={selectedDeadlineTime}
          addDeadline={addDeadline}
          removeDeadline={confirmDeleteDeadline}
          setShowDeadlinePicker={setShowDeadlinePicker}
        />
      </ScrollView>
  );
};

export default ClockScreen;
