import React, { useLayoutEffect, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {useNavigation} from "@react-navigation/native";

const auth = getAuth();
const db = getFirestore();
const userUID = auth.currentUser ? auth.currentUser.uid : "";

const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
    return (
        <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: color }]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={onOptions}>
                    <Ionicons name="options-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default function ToDoScreen ( ) {
    const [lists, setLists] = useState([]);
    // const userRef = doc(db, 'users', userUID);
    // const listsRef = collection(userRef, 'lists');
    const listsRef = collection(db, 'users', userUID, 'lists');

    const fetchAndSortLists = async () => {
      const listsQuery = query(listsRef, orderBy('index'));
      const snapshot = await onSnapshot(listsQuery);
      const sortedLists = snapshot.docs.map((doc) => doc.data());
      return sortedLists;
    };


    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onSnapshot(listsRef, (snapshot) => {
            const sortedLists = snapshot.docs.map((doc) => doc.data()).sort((a, b) => a.index - b.index);
            setLists(sortedLists);
        });
    
        return unsubscribe;
    }, []);
    

    const addItemToLists = async ({ title, color }) => {
        const lists = fetchAndSortLists();
        const index = lists.length > 0 ? lists[lists.length - 1].index + 1 : 0;
        const docRef = await addDoc(collection(db, 'users', userUID, 'lists'), {
            title,
            color,
            index
        });
        console.log('Document written with ID: ', docRef.id);
        const newData = {
            id: docRef.id
        };
        updateDoc(docRef, newData);
    };

    const removeItemFromLists = async (id) => {
        const docRef = doc(listsRef, id);
        await deleteDoc(docRef);
    };

    const deleteList = async (id) => {
        const listRef = doc(listsRef, id);
        await deleteDoc(listRef);
    };
    

    const updateItemFromLists = async (id, item) => {
        await updateDoc(doc(listsRef, id), item);
    };

    return (
        <View style={styles.container}>
          <TouchableOpacity
              onPress={() =>
                  navigation.navigate("Edit", { saveChanges: addItemToLists })
              }
              style={styles.button}
          >
              <Text style={styles.buttonText}>New To-do</Text>
          </TouchableOpacity>
            <FlatList
                data={lists}
                renderItem={({ item: { title, color, id, index } }) => {
                    return (
                        <ListButton
                            title={title}
                            color={color}
                            id={id}
                            navigation={navigation}
                            onPress={() => {
                                navigation.navigate("ToDoList", {
                                    title,
                                    color,
                                    listId: id,
                                });
                            }}
                            // onPress={() => {console.log('id:' ,id)
                            // }}
                            onOptions={() => {
                                navigation.navigate("Edit", {
                                    title,
                                    color,
                                    saveChanges: (newItem) =>
                                        updateItemFromLists(id, {
                                            index,
                                            ...newItem,
                                        }),
                                });
                            }}
                            onDelete={() => deleteList(id)}
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
        backgroundColor: "#fff",
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
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
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