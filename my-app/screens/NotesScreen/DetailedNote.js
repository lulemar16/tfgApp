import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import ColorSelector from "../../components/ColorSelector";
import Button from "../../components/Button";
import { Timestamp } from 'firebase/firestore';


const colorList = [
    "blue",
    "teal",
    "green",
    "olive",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "blueGray",
];

export default ({ navigation, route }) => {
    const [id, setId] = useState(route.params.id || "");
    const [title, setTitle] = useState(route.params.title || "");
    const [content, setContent] = useState(route.params.content || "");
    const [date, setDate] = useState(route.params.date || "");
    const [color, setColor] = useState(route.params.color || Colors.blue);
    const [isValid, setValidity] = useState(true);

    return (
        <View style={styles.container}>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>Note Title</Text>
                    {!isValid && (
                        <Text
                            style={{
                                marginLeft: 4,
                                color: Colors.red,
                                fontSize: 12,
                            }}
                        >
                            * Note title cannot be empty
                        </Text>
                    )}
                </View>
                <TextInput
                    underlineColorAndroid={"transparent"}
                    selectionColor={"transparent"}
                    autoFocus={true}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        setValidity(true);
                    }}
                    placeholder={"New Note Title"}
                    maxLength={30}
                    style={[styles.input, { outline: "none" }]}
                />
                <TextInput
                    underlineColorAndroid={"transparent"}
                    selectionColor={"transparent"}
                    autoFocus={true}
                    value={content}
                    onChangeText={(text) => {
                        setContent(text);
                        setValidity(true);
                    }}
                    placeholder={"Enter note here"}
                    maxLength={2000}
                    style={[styles.inputContent, { outline: "none" }]}
                />
                <Text style={styles.label}>Choose Color</Text>
                <ColorSelector
                    onSelect={(color) => {
                        setColor(color);
                        navigation.dispatch(CommonActions.setParams({ color }));
                    }}
                    selectedColor={color}
                    colorOptions={colorList}
                />
            </View>
            <Button
                text="Save"
                onPress={() => {
                    if (title.length > 1) {
                        const date = Timestamp.fromDate(new Date());
                        route.params.saveChanges({ id, title, content, date , color });
                        navigation.dispatch(CommonActions.goBack());
                    } else {
                        setValidity(false);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        justifyContent: "space-between",
    },
    input: {
        color: Colors.darkGray,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 30,
        fontSize: 24,
    },
    inputContent: {
        color: Colors.darkGray,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 300,
        fontSize: 24,
    },
    saveButton: {
        borderRadius: 25,
        backgroundColor: Colors.darkGray,
        height: 48,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: Colors.black,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
});