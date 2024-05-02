import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AlarmsSection from './AlarmsScreen';
import TimersSection from './TimersScreen';
import DeadlinesSection from './DeadlinesScreen';
import CustomDateTimePickerModal from './DateTimePickerModal'; 
import styles from './styles'; 
import dayjs from 'dayjs';
// import { ScrollView, GestureHandlerRootView  } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-virtualized-view'
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {useNavigation} from "@react-navigation/native";
import PushNotification from 'react-native-push-notification';

const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "";

const ClockScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [timers, setTimers] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [newAlarm, setNewAlarm] = useState('');
  const [newAlarmTitle, setNewAlarmTitle] = useState('');
  const [newTimer, setNewTimer] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newDeadlineTitle, setNewDeadlineTitle] = useState('');
  const [showAlarmPicker, setShowAlarmPicker] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [selectedAlarmTime, setSelectedAlarmTime] = useState(new Date());
  const [selectedTimerTime, setSelectedTimerTime] = useState(new Date());
  const [selectedDeadlineTime, setSelectedDeadlineTime] = useState(new Date());

  const userRef = doc(db, 'users', userUID);
  const alarmsRef = collection(userRef, 'alarms');
  // const alarmsRef = collection(db, 'users', userUID, 'alarms');

  const timersRef = collection(userRef, 'timers');
  // const timersRef = collection(db, 'users', userUID, 'timers');

  const deadlinesRef = collection(userRef, 'deadlines');
  // const deadlinesRef = collection(db, 'users', userUID, 'deadlines');

  // useEffect(() => {
  //   const timerInterval = setInterval(updateTimers, 1000);
  //   return () => clearInterval(timerInterval);
  // }, [timers]);

  useEffect(() => {
    const fetchData = async () => {
      const alarmsSnapshot = await getDocs(alarmsRef);
      const alarmsData = alarmsSnapshot.docs.map(doc => doc.data());
      const timersSnapshot = await getDocs(timersRef);
      const timersData = timersSnapshot.docs.map(doc => doc.data());
      const deadlinesSnapshot = await getDocs(deadlinesRef);
      const deadlinesData = deadlinesSnapshot.docs.map(doc => doc.data());
      setAlarms(alarmsData);
      setTimers(timersData);
      setDeadlines(deadlinesData);
    };
    PushNotification.configure();
    PushNotification.requestPermissions();
    fetchData();

    const timerInterval = setInterval(updateTimers, 1000);
    return () => clearInterval(timerInterval);
  }, [timers]);


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
    console.log("Updating timers...");
    const updatedTimers = timers.map(async (timer, index) => {
      console.log(`Timer ${index + 1}: ${timer.time}`);
      if (!timer.paused) {
        const [hours, minutes, seconds] = timer.time.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        totalSeconds = Math.max(0, totalSeconds - 1);
  
        if (totalSeconds === 0) {
          const initialTime = timer.initialTime;
          await toggleTimer(index);
          console.log(`Timer ${index + 1} reached 0 seconds. Resetting to initial time: ${initialTime}`);
          return { ...timer, time: initialTime };
        }
  
        const newTime = dayjs()
          .startOf('day')
          .add(totalSeconds, 'seconds')
          .format('HH:mm:ss');
        console.log(`Timer ${index + 1} updated to: ${newTime}`);
        return { ...timer, time: newTime };
      }
      return timer;
    });
  
    const updatedTimersData = await Promise.all(updatedTimers);
    console.log("Updated timers:", updatedTimersData);
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

  // const toggleDeadline = (index) => {
  //   const updatedDeadlines = [...deadlines];
  //   updatedDeadlines[index].enabled = !updatedDeadlines[index].enabled;
  //   setDeadlines(updatedDeadlines);
  // };

  const removeDeadline = async (index) => {
    const deadlineToRemove = deadlines[index];
    const deadlineDocRef = doc(deadlinesRef, deadlineToRemove.id);
    await deleteDoc(deadlineDocRef);
    const updatedDeadlines = [...deadlines];
    updatedDeadlines.splice(index, 1);
    setDeadlines(updatedDeadlines);
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
          newDeadlineTitle={newDeadlineTitle} 
          setNewDeadlineTitle={setNewDeadlineTitle}
          showDeadlinePicker={showDeadlinePicker}
          selectedDeadlineTime={selectedDeadlineTime}
          addDeadline={addDeadline}
          removeDeadline={removeDeadline}
          // toggleDeadline={(index) => toggleDeadline(index)}
          setShowDeadlinePicker={setShowDeadlinePicker}
        />
      </ScrollView>
  );
};

export default ClockScreen;
