import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, query, orderBy, setDoc, getDoc, collection, getDocs, addDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from 'dayjs';


const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "anonymous";

const ListButton = ({ title, date, color, onPress, onDelete, onOptions }) => {
  return (
    <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: color }]}
        onPress={onPress}
    >
        <View style={styles.noteText}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemDate}>{date}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={onDelete}>
                <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
  );
};

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const notesRef = collection(doc(db, 'users', userUID), 'notes');


  const fetchAndSortNotes = async () => {
    const notesSnapshot = await getDocs(
      query(notesRef, orderBy("date"))
    );
    const notesData = notesSnapshot.docs.map(doc => doc.data());
    return notesData; 
  };

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const sortedNotes = await fetchAndSortNotes();
      setNotes(sortedNotes);
      console.log(notes);
    };
    fetchData();
  }, []);
  

  const formatDate = (date) => {
    const jsDate = new Date(date.seconds * 1000); 
    const parsedDate = dayjs(jsDate);
    return parsedDate.format('DD.MM.YYYY [at] HH:mm');
  };


  const addItemToNotes = async ({ title, content, date, color }) => {
    const index = notes.length > 0 ? notes[notes.length - 1].index + 1 : 0;
    const docRef = await addDoc(notesRef, {
        title,
        content,
        date,
        color,
        index
    });
    console.log('Document written with ID: ', docRef.id);
    const newData = {
        id: docRef.id
    };
    updateDoc(docRef, newData);
    const sortedNotes = await fetchAndSortNotes();
    setNotes(sortedNotes);
  };

  const updateNote = async ({ id, title, content, date, color }) => {
    if (!id) {
      console.error("Invalid note id");
      return;
    }
    
    const newData = {
      title: title,
      content: content,
      date: date,
      color: color,
    };
    const docRef = doc(notesRef, id);
    updateDoc(docRef, newData);
    const sortedNotes = await fetchAndSortNotes();
    setNotes(sortedNotes);
  };

  const deleteNote = async (id) => {
    const noteRef = doc(notesRef, id);
    await deleteDoc(noteRef);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("EditNote", { saveChanges: addItemToNotes })
        }
        >
        <Text style={styles.buttonText}>New note</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={({ item: { title, content, date, color, id, index } }) => {
            return (
                <ListButton
                    title={title}
                    date={formatDate(date)}
                    color={color}
                    id={id}  
                    navigation={navigation}
                    onPress={() => {
                        navigation.navigate("DetailedNote", {
                            id,
                            title,
                            content,
                            date,
                            color,
                            listId: id,
                            saveChanges: updateNote
                        });
                    }}
                    onDelete={() => deleteNote(id)}
                />
            );
        }}
    />
    </ScrollView> 
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  listItemContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FCCA00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteText:{
    flexDirection: 'column'
  },
  itemTitle: { 
    fontSize: 24, 
    padding: 5, 
    color: "white" 
  },
  itemDate: { 
    fontSize: 18, 
    padding: 5, 
    color: "grey" 
  },
  itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 100,
      flex: 1,
      borderRadius: 20,
      marginHorizontal: 20,
      marginVertical: 10,
      padding: 15,
  },
  icon: {
      padding: 5,
      fontSize: 24,
  },
  centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
  },
  modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
});
