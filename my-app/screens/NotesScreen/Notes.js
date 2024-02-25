import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import { ListItem } from '@rneui/base';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

import appFirebase from '../../credentials';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function Notes(props) {
  const [list, setList] = useState([]);

  // call the list of documents
  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notes'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { title, detail, day, time } = doc.data();
          docs.push({
            id: doc.id,
            title,
            detail,
            day,
            time,
          });
        });
        setList(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, []); // volver a poner [list] en vez de []

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Create')}
      >
        <Text style={styles.buttonText}>Add new note</Text>
      </TouchableOpacity>

      {list.map((note) => (
        <ListItem
          bottomDivider
          key={note.id}
          onPress={() => {
            props.navigation.navigate('Details', { noteId: note.id });
          }}
          style={styles.listItemContainer}
        >
          <ListItemChevron />

          <ListItemContent>
            <ListItemTitle style={styles.title}>{note.title}</ListItemTitle>
            <ListItemSubtitle>{note.day}</ListItemSubtitle>
          </ListItemContent>
        </ListItem>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
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
});