import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, CheckBox } from 'react-native';

import { ListItem } from '@rneui/base';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

import appFirebase from '../../credentials';
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
          const { title, tasks } = doc.data();
          todos.push({
            id: doc.id,
            title,
            tasks: tasks || [],
          });
        });
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const toggleTask = (todoId, taskId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              tasks: todo.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : todo
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Create')}
      >
        <Text style={styles.buttonText}>Add new ToDo list</Text>
      </TouchableOpacity>

      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          onPress={() => {
            props.navigation.navigate('Details', { todoId: todo.id });
          }}
          style={styles.listItemContainer}
        >
          <ListItemChevron />
          <ListItemContent>
            <ListItemTitle style={styles.title}>{todo.title}</ListItemTitle>
            {todo.tasks.map((task) => (
              <View key={task.id} style={styles.taskContainer}>
                <CheckBox
                  value={task.completed}
                  onValueChange={() => toggleTask(todo.id, task.id)}
                />
                <Text style={styles.taskTitle}>{task.title}</Text>
              </View>
            ))}
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
    backgroundColor: '#4CAF50',
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
    marginLeft: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  taskTitle: {
    marginLeft: 10,
  },
});
