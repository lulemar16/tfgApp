import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, CheckBox } from 'react-native';

import { ListItem } from '@rneui/base';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

import appFirebase from '../credentials';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const db = getFirestore(appFirebase);

export default function Todos(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'todos'));
        const todos = [];
        querySnapshot.forEach((doc) => {
          const { title, detail, day, time } = doc.data();
          todos.push({
            id: doc.id,
            title,
            detail,
            day,
            time,
            completed: false, // Added a completed property for the checkbox
          });
        });
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Create')}
        >
          <Text style={styles.buttonText}>Add new ToDo list</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            onPress={() => {
              props.navigation.navigate('Details', { todoId: todo.id });
            }}
          >
            <ListItemChevron />

            <ListItemContent>
              {/* Use the CheckBox component here */}
              <CheckBox
                value={todo.completed}
                onValueChange={() => toggleTodo(todo.id)}
              />
              <ListItemTitle style={styles.title}>{todo.title}</ListItemTitle>
              <ListItemSubtitle>{todo.day}</ListItemSubtitle>
            </ListItemContent>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBF6B',
    borderColor: '#E99D42',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 10, // Adjusted the margin to make space for the checkbox
  },
});
