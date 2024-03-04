// TodoListsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import appFirebase from '../../credentials';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function TodoListsScreen() {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('lists').onSnapshot(snapshot => {
      const listsData = [];
      snapshot.forEach(doc => listsData.push({ ...doc.data(), id: doc.id }));
      setLists(listsData);
    });
    return () => unsubscribe();
  }, []);

  const addList = async () => {
    if (newListTitle.trim() !== '') {
      await addDoc(collection(db, 'lists'), { title: newListTitle, createdAt: new Date() });
      setNewListTitle('');
    }
  };

  const renderList = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.listTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do Lists</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter list title"
          value={newListTitle}
          onChangeText={text => setNewListTitle(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addList}>
          <Text style={styles.addButtonText}>Add List</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={renderList}
        style={styles.listsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputText: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#E99D42',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listsContainer: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listTitle: {
    fontSize: 18,
  },
});
