import { ScrollView, StyleSheet, Text, View, Alert, Modal, Dimensions, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import RoundIconBtn from '../Components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from '../Components/ThemeProvider'


const NoteDetail = props => {

    const { note } = props.route.params;
    const [editedNote, setEditedNote] = useState({})

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('DATA');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
        const newNotes = notes.filter(n => n.id !== note.id);
        await AsyncStorage.setItem('DATA', JSON.stringify(newNotes));
        props.navigation.goBack();
    };

    const NoteEdit = async () => {
        await AsyncStorage.setItem('editnote', JSON.stringify(editedNote))
        props.navigation.navigate('EDITNOTE')
    }

    const displayDeleteAlert = () => {
        Alert.alert('Are You Sure', 'This action will delete your Note Permenantly!', [
            {
                text: 'Delete',
                onPress: deleteNote,
            },
            {
                text: 'No Thanks',
                onPress: () => console.log('canceled'),
            }
        ], { cancelable: true }
        )
    }

    const formatDate = (ms) => {
        const date = new Date(ms);
        const day = date.getDay();
        const month = date.getMonth() + 1;
        const year = date.getFullYear()
        const hrs = date.getHours();
        const mins = date.getMinutes();
        const sec = date.getSeconds();

        return `${day}/${month}/${year} - ${hrs}:${mins}:${sec}`
    }

    const rerender = async () => {
        const result = await AsyncStorage.getItem('DATA')
        const notes = JSON.parse(result)
        const openedNote = notes.filter(n => n.id == note.id)
        setEditedNote(openedNote[0])
    }

    useFocusEffect(
        useCallback(() => {
            rerender();
        }, [])
    )

    const { theme } = useTheme()

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.time}>{`Created At: ${formatDate(note.time)}`}</Text>
                <Text style={[styles.title, { color: theme.primary }]}>{editedNote.title}</Text>
                <Text style={[styles.desc, { color: theme.textColor }]}>{editedNote.desc}</Text>

            </ScrollView>

            <View style={styles.btnContainer}>

                <RoundIconBtn style={styles.editBtn}
                    antIconName='edit'
                    onPress={NoteEdit} />

                <RoundIconBtn antIconName='delete'
                    style={{ backgroundColor: 'red', marginTop: 15 }}
                    onPress={displayDeleteAlert} />

            </View>
        </View>
    )
}

export default NoteDetail

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 15,
        flex: 1

    },
    title: {
        fontSize: 30,
        marginTop: 5,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 22,
        opacity: 0.6
    },
    time: {
        textAlign: 'right',
        opacity: 0.5,
        fontSize: 14,
        marginTop: 10
    },
    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50
    },
    editBtn: {

    },
    deleteBtn: {

    },
})