import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';
import { db } from '../../firebaseConfig';

const TodoList = ({ list, onAddTodo, onUpdateTodo, onDeleteTodo }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('lists')
      .doc(list.id)
      .collection('todos')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const todosData = [];
        snapshot.forEach(doc => todosData.push({ ...doc.data(), id: doc.id }));
        setTodos(todosData);
      });

    return () => unsubscribe();
  }, [list]);


  const addTodo = async (text) => {
    await db.collection('lists').doc(list.id).collection('todos').add({
    text,
    createdAt: new Date(),
    completed: false, // Set the initial completed state
    });
  };
  

  const updateTodo = async (todo) => {
    await db.collection('lists').doc(list.id).collection('todos').doc(todo.id).update(todo);
  };

  const deleteTodo = async id => {
    await db.collection('lists').doc(list.id).collection('todos').doc(id).delete();
  };

  return (
    <View style={styles.list}>
      <Text style={styles.title}>{list.title}</Text>
      <Button title="Add Todo" onPress={() => addTodo('')} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onUpdate={text => updateTodo({ ...item, text })}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default TodoList;