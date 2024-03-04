// TodoItem.js
import React from 'react';
import { View, Text, TextInput, Button, CheckBox, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onUpdate, onDelete }) => (
  <View style={styles.item}>
    <CheckBox
      value={todo.completed}
      onValueChange={() => onUpdate({ ...todo, completed: !todo.completed })}
    />
    <TextInput
      style={styles.input}
      value={todo.text}
      onChangeText={(text) => onUpdate({ ...todo, text })}
    />
    <Button title="Delete" onPress={() => onDelete(todo.id)} />
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    marginLeft: 8, // Adjust the margin to give space between checkbox and text input
  },
});

export default TodoItem;
