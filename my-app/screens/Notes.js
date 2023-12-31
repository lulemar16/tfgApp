import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import { ListItem } from '@rneui/base';

import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

import appFirebase from '../credentials';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';
const db = getFirestore(appFirebase)

export default function Notes(props) {

    const [list, setList] = useState([])

    // call the list of documents
    useEffect(() => {
        const getList = async()=> {
            try {
                const querySnapshot = await getDocs(collection(db, 'notes'))
                const docs = []
                querySnapshot.forEach((doc)=> {
                    const {title, detail, day, time} = doc.data()
                    docs.push({
                        id: doc.id,
                        title,
                        detail,
                        day,
                        time
                    })
                })
                setList(docs);
            } catch (error) {
                console.log(error)
            }
        }
        getList()
    }, [] ) // volver a poner [list] en vez de []

    return (
     <ScrollView>
        <View>
            <TouchableOpacity style= {styles.button} onPress={()=>props.navigation.navigate('Create')}> 
                <Text style={styles.buttonText}>Add new note</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            {list.map((note) => (
                <ListItem bottomDivider key={note.id} onPress={()=>{props.navigation.navigate('Details',
                    {noteId: note.id})}}>
                    <ListItemChevron/>

                    <ListItemContent>
                        <ListItemTitle style={styles.title}>{note.title}</ListItemTitle>
                        <ListItemSubtitle>{note.day}</ListItemSubtitle>
                    </ListItemContent>
                </ListItem>
            ))}
        </View>

     </ScrollView> 
    )

    // return (
    //     <View>
    //         <TouchableOpacity style= {styles.button} onPress={()=>props.navigation.navigate('Create')}> 
    //             <Text style={styles.buttonText}>Add new note</Text>
    //         </TouchableOpacity>
    //     </View>
    // )
  
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#FFBF6B',
        borderColor: '#E99D42',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20, 
        marginRight: 20,
        marginTop: 20
    },
    buttonText:{
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 16
    },
    container: {
        margin:20,
        backgroundColor: 'white',
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor: '#000',
        shadowOffset: {
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    title:{
        fontWeight:'bold'
    }
})