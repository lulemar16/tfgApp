import { Text, StyleSheet, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

import appFirebase from '../credentials';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';
const db = getFirestore(appFirebase)

export default function DetailedNote(props) {

  const [note, setNote] = useState({})

  const getOneNote = async(id)=> {
    try{
      const docRef = doc(db, 'notes', id)
      const docSnap = await getDoc(docRef)
      setNote(docSnap.data())
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=> {
    getOneNote(props.route.params.noteId)
  }, [])

  const deleteNote = async(id) => {
    await deleteDoc(doc(db, ' notes', id))
    Alert.alert('Done', 'Note deleted')
    props.navigation.navigate('Notes')
  }


    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>Title: {note.title}</Text>
          <Text style={styles.text}>Detail: {note.detail}</Text>
          <Text style={styles.text}>Date: {note.day}</Text>
          <Text style={styles.text}>{note.time}</Text>

          <TouchableOpacity style={styles.deleteButton} onPress={()=>deleteNote(props.route.params.noteId)}>
            <Text style={styles.deleteText}>
              Delete
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    margin:20,
    backgroundColor: 'white',
    borderRadius:20,
    width:'90%',
    padding:10,
    shadowColor: '#000',
    shadowOffset:{
      width:0,
      height:2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation:5
  },
  text: {
    fontSize:16,
    fontWeight: '600',
    marginTop:10
  },
  deleteButton:{
    backgroundColor: '#E99D42',
    borderColor: '#F4CE98',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft:20,
    marginRight:20,
    marginTop:20
  },
  deleteText:{
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize:16
  }
})