import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'


import appFirebase from '../credentials';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';
const db = getFirestore(appFirebase)

export default function CreateNote(props) {

  const initialState = {
    title: '',
    detail: ''
  }

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("empty");  
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [state, setState] = useState(initialState);

  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let fDate = 
      tempDate.getDate() + "/" +
      (tempDate.getMonth() + 1 ) + "/" +
      tempDate.getFullYear();

    setDay(fDate);

    let fTime = 
      tempDate.getHours() + ":"
      + tempDate.getMinutes();
    // setText(fDate + " " + fTime)
    setTime(fTime);
  }

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  }

  const handleChangeText = (value, name) => {
    setState({...state, [name]:value})
  }

  // const saveNote = () => {
  //   const note = {
  //     title: state.title,
  //     detail: state.detail,
  //     day: day,
  //     time: time
  //   }
  //   console.log(note);
  // }

  const saveNote = async() => {
    try {
      if(state.title === '' || state.detail === '') {
        Alert.alert('Important message', 'You should fill the form')
      }
      else {
        const note = {
          title: state.title,
          detail: state.detail,
          day: day,
          time: time
        }
        await addDoc(collection(db, 'notes'), {
          ...note
        })
        Alert.alert('Done', 'Save completed')
        props.navigation.navigate('Notes')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.containerFather}>
      <View style={styles.card}>
        <View style={styles.container}>
          <TextInput 
            placeholder='Title' 
            style={styles.inputText} 
            value={state.title}
            onChangeText={(value)=>handleChangeText(value, 'title')}
          />

          <TextInput 
            placeholder='Note' 
            multiline={true} 
            numberOfLines={8} 
            style={styles.inputText}
            value={state.detail} 
            onChangeText={(value)=>handleChangeText(value, 'detail')}
          />
          
          {/* date container */}
          <View style={styles.inputDate}>
            <TextInput placeholder='05/11/2023' style={styles.dateText} value={day}/>
            <TouchableOpacity style={styles.dateButton} onPress={() => showMode("date")}>
              <Text style={styles.subtitle}>Date</Text>
            </TouchableOpacity>
          </View>

          {/* time container */}
          <View style={styles.inputDate}>
            <TextInput placeholder='Hour: 11 ; Minutes: 11' style={styles.dateText} value={time}/>
            <TouchableOpacity style={styles.dateButton} onPress={() => showMode("time")}>
              <Text style={styles.subtitle}>Time</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode = {mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
              minimumDate={new Date("2023-1-1")}
            />
          )}

          {/* button to save the data */}
          <View style={styles.inputDate}>
            <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
              <Text style={styles.saveText}>
                Save note
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  )
  
}

const styles = StyleSheet.create({
  containerFather: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  card: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation:5
  },
  container: {
    padding:20
  },
  inputText: {
    borderColor: '#F4CE98',
    borderWidth: 1,
    padding: 8, 
    marginTop:10,
    borderRadius:8
  },
  inputDate: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  dateButton: {
    backgroundColor: '#E99D42',
    borderRadius:5,
    padding:10,
    width:'30%',
    height: '90%',
    marginTop: 10,
    marginLeft: 10
  },
  dateText: {
    borderColor: '#F4CE98',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8
  },
  subtitle: {
    color: 'white',
    fontSize:18
  },
  saveButton: {
    backgroundColor: '#E99D42',
    borderColor: '#F4CE98',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  saveText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  }
})