import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Notes(props) {

    return (
     <ScrollView>
        <View>
            <TouchableOpacity style= {styles.button} onPress={()=>props.navigation.navigate('Create')}> 
                <Text style={styles.buttonText}>Add new note</Text>
            </TouchableOpacity>
        </View>
     </ScrollView> 
    )
  
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
    }
})