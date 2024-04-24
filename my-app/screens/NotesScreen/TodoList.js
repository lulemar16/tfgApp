import React, { useState, useLayoutEffect, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import ToDoItem from "../../components/ToDoItem";
import Colors from "../../constants/Colors";
import { getFirestore, doc, collection, onSnapshot, orderBy, query, addDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "";

export default ({ navigation, route }) => {
    const [toDoItems, setToDoItems] = useState([]);
    const [newItem, setNewItem] = useState(null);

    // const toDoItemsRef = collection(
    //     db,
    //     'users',
    //     userUID,
    //     'lists',
    //     route.params.listId,
    //     'todoItems'
    // );

    const toDoItemsRef = collection(
        doc(db, 'users', userUID, 'lists', route.params.listId),
        'todoItems'
    );
    
    // useEffect(() => {
    //     if (newItem) {
    //         setToDoItems([newItem, ...toDoItems]);
    //     }
    // }, [newItem, toDoItems]);

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //         query(toDoItemsRef, orderBy('isChecked', 'desc')),
    //         (snapshot) => {
    //             const newToDoItems = snapshot.docs.map((doc) => doc.data());
    //             setToDoItems(newToDoItems);
    //         }
    //     );

    //     return () => unsubscribe();
    // }, []);

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //         query(toDoItemsRef, orderBy('isChecked', 'desc')),
    //         (snapshot) => {
    //             const newToDoItems = snapshot.docs.map((doc) => doc.data());
    //             setToDoItems(newToDoItems);
    //         }
    //     );

    //     return () => unsubscribe();
    // }, [toDoItemsRef]); // Make sure to include toDoItemsRef as a dependency

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(toDoItemsRef, orderBy('isChecked', 'desc')),
            (snapshot) => {
                const newToDoItems = snapshot.docs.map((doc) => doc.data());
                setToDoItems(newToDoItems);
            }
        );

        return () => unsubscribe();
    }, [toDoItemsRef]);

    useEffect(() => {
        if (newItem) {
            // Add the new item to the beginning of the list
            setToDoItems((prevItems) => [newItem, ...prevItems]);
        }
    }, [newItem]);

    const addItemToLists = async () => {
        console.log('----2')
        setNewItem({ text: '', isChecked: false, new: true });
        console.log('-----', newItem)
    };

    const removeItemFromLists = async (index) => {
        const itemToRemove = toDoItems[index];
        await deleteDoc(doc(toDoItemsRef, itemToRemove.id));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => addItemToLists()}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <FlatList
                data={toDoItems}
                renderItem={({
                    item: { id, text, isChecked, ...params },
                    index,
                }) => {
                    return (
                        <ToDoItem
                            {...params}
                            text={text}
                            isChecked={isChecked}
                            onChecked={() => {
                                let data = { text, isChecked: !isChecked };
                                if (id) {
                                    data.id = id;
                                }
                                addDoc(toDoItemsRef, data);
                            }}
                            onChangeText={(newText) => {
                                if (params.new) {
                                    setNewItem({
                                        text: newText,
                                        isChecked,
                                        new: params.new,
                                    });
                                } else {
                                    toDoItems[index].text = newText;
                                    setToDoItems([...toDoItems]);
                                }
                            }}
                            onDelete={() => {
                                params.new
                                    ? setNewItem(null)
                                    : removeItemFromLists(index);
                                id && deleteDoc(doc(toDoItemsRef, id));
                            }}
                            onBlur={() => {
                                if (text.length > 1) {
                                    let data = { text, isChecked };
                                    if (id) {
                                        data.id = id;
                                    }
                                    addDoc(toDoItemsRef, data);
                                    params.new && setNewItem(null);
                                } else {
                                    params.new
                                        ? setNewItem(null)
                                        : removeItemFromLists(index);
                                }
                            }}                        
                        />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    icon: {
        marginLeft: '45%',
        fontSize: 32,
        color: "black",
        justifyContent:'center', 
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
});
