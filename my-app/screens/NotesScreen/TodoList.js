import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import { getFirestore, doc, collection, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Colors from "../../constants/Colors";

const auth = getAuth();   
const db = getFirestore(); 
const userUID = auth.currentUser ? auth.currentUser.uid : "anonymous";
 
export default ({ navigation, route }) => {
    const [toDoItems, setToDoItems] = useState([]);
    const [newItemText, setNewItemText] = useState('');

    const toDoItemsRef = collection(doc(db,'users',userUID,'lists',route.params.listId),'todoItems'); 

    const TodoItem = ({ todo, onUpdate, onDelete }) => {
        return (
          <View style={styles.item}>
            <TouchableOpacity style={styles.checkbox} onPress={() => onUpdate({ ...todo, isChecked: !todo.isChecked })}>
                <Text style={{color: Colors.lightGray}}>{todo.isChecked ? "✓" : ""}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input2}
              value={todo.text}
              onChangeText={(text) => onUpdate({ ...todo, text })} 
            />
            <TouchableOpacity style={{color: Colors.yellow}} onPress={() => onDelete(todo.id)}>
                <Text style={{color: Colors.red}}>X</Text>
            </TouchableOpacity>
          </View>
        );
    };

    useEffect(() => { 
        const fetchData = async () => {
            const todosSnapshot = await getDocs(toDoItemsRef);
            const todosData = todosSnapshot.docs.map(doc => doc.data());
            setToDoItems(todosData);
            console.log('Todos: ', toDoItems);
        }; 
        fetchData();
    }, []);

    const addItemToLists = async () => {
        if (newItemText.trim() !== '') {
            const newItemData = { text: newItemText, isChecked: false, new: true };
            const docRef = await addDoc(toDoItemsRef, newItemData);
            updateDoc(docRef, { id: docRef.id })
            setToDoItems(prevItems => [newItemData, ...prevItems]);
            setNewItemText('');
        }
    };

    const removeItemFromLists = async (id) => {
        await deleteDoc(doc(toDoItemsRef, id));
        setToDoItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const confirmDeleteItem = (id) => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this timer?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => removeItemFromLists(id) },
          ]
        ); 
      };

    const updateItemFromLists = async (id) => {
        await updateDoc(doc(toDoItemsRef, id));
        fetchData();
    };

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                value={newItemText}
                onChangeText={setNewItemText}
                placeholder="Type new item..."
            />
            <TouchableOpacity style={styles.button} onPress={addItemToLists}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <FlatList
                data={toDoItems}
                renderItem={({ item }) => (
                    <TodoItem
                        todo = {item}
                        onUpdate = {updateItemFromLists}
                        onDelete = {confirmDeleteItem}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#FCCA00',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkbox: {
        width: 20,
        height: 20,
        margin: 5,
        backgroundColor: "#fff0",
        color: Colors.lightGray,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Colors.lightGray,
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input2: {
        flex: 1,
        marginLeft: 8, 
    },
});
