import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, getDocs, doc, deleteDocs, deleteDoc } from 'firebase/firestore';
import { Audio } from 'expo-av';

const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "anonymous";


export default function AudioScreen() {

  const recordsRef = collection(doc(db, 'users', userUID), 'recordings');

  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [recordingTitle, setRecordingTitle] = useState('');
  const [recording, setRecording ] = useState();
  const [playbackState, setPlaybackState] = useState(false);
  const [soundObjectPlaying, setSoundObjectPlaying] = useState();

  useEffect(() => {    
    const fetchData = async () => {
      const recordsSnapshot = await getDocs(recordsRef);
      const recordsData = recordsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecordings(recordsData);
    };
    fetchData();
  }, []);

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        setIsRecording(true);
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {}
  };
  
  const stopRecording = async () => {
    setRecording(undefined);
    setIsRecording(false);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    
    try {
      const { status } = await recording.createNewLoadedSoundAsync();
      if (status) {
        const newRecording = {
          title: recordingTitle,
          uri: recording.getURI(),
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI()
        };
        allRecordings.push(newRecording);
        saveRecordingToFirestore(newRecording);
      } else {
        console.error('Failed to get status when creating sound.');
      }
    } catch (error) {
      console.error('Error creating loaded sound: ', error);
    }
    setRecordings(allRecordings);
  }
  

  const getDurationFormatted = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  };

  const getRecordingLines = () => {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.playbackContainer}>
          <TouchableOpacity onPress={() => confirmDeleteRecording(recordingLine)}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
          <Text style={styles.fill}>
           {recordingLine.title} | {recordingLine.duration}
          </Text>
          <View style={styles.playback}>
          <TouchableOpacity style={styles.playbackButton} onPress={() => playbackState ? pauseRecording() : playRecording(recordingLine.uri)}>
            <Text style={styles.buttonText}>{playbackState ? '⏸️' : '▶'}</Text>
          </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const playRecording = async (uri) => {
    const soundObject = new Audio.Sound();
  
    try {
      await soundObject.loadAsync({ uri: uri });
      await soundObject.playAsync();
  
      // Set the playback state to true
      setPlaybackState(true);
  
      // Set the sound object to state for later use
      setSoundObjectPlaying(soundObject);
    } catch (error) {
      console.error('Error playing recording: ', error);
    }
  };

  const pauseRecording = async () => {

    try {
      if (soundObjectPlaying) {
        await soundObjectPlaying.pauseAsync();
  
        // Set the playback state to false
        setPlaybackState(false);
        setSoundObjectPlaying();
      }
    } catch (error) {
      console.error('Error pausing recording: ', error);
    }
  };
  

  const clearRecordings = () => {
    setRecordings([]);
    deleteDocs(recordsRef); 
  }

  const saveRecordingToFirestore = async (newRecording) => {
    try {
      const docRef = await addDoc(recordsRef, newRecording);
      console.log('Recording added with ID: ', docRef.id);
      updateDoc(docRef, {
        id: docRef.id,
      })
      setRecordingTitle(null);
    } catch (error) {
      console.error('Error adding recording: ', error);
    }
  };

  const confirmDeleteRecording = (recording) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteRecording(recording) },
      ]
    );
  };

  const deleteRecording = async (recording) => {
    try {
      await deleteDoc(doc(recordsRef, recording.id));
      const updatedRecordings = recordings.filter(rec => rec.id !== recording.id);
      setRecordings(updatedRecordings);
      console.log('Recording deleted successfully.');
    } catch (error) {
      console.error('Error deleting recording: ', error);
    }
  };  

  return (
    <View style={styles.container}>
        {getRecordingLines()}
      <View style={styles.record}>
      <TouchableOpacity style={styles.recordButton} onPress={recording ? stopRecording : startRecording}>
        <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.recordButton} onPress={clearRecordings}>
        <Text style={styles.buttonText}>{recordings.length > 0 ? 'Clear Recordings' : ''}</Text>
      </TouchableOpacity>
      {isRecording && (
          <TextInput
            style={styles.titleInput}
            placeholder="Recording Title"
            onChangeText={(text) => setRecordingTitle(text)}
            value={recordingTitle}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  recordingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playbackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCCA00',
    borderColor: '#black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  playbackButton: {
    color: 'black',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  playbackText: {
    color: 'black',
    margin: 10
  },
  playback: {
    paddingLeft: '50%'
  },
  titleText: {
    color: 'black',
    fontSize: 14,
    marginTop: 5,
    marginRight:'60%'
  },
  titleInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
  },
  record: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 200,
    height: 40,
    backgroundColor: '#FCCA00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordingInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
  },
  pauseButton: {
    marginRight: 10,
    backgroundColor: 'black',
  },
  recordingTime: {
    fontSize: 16,
    color: 'black',
  },
});
