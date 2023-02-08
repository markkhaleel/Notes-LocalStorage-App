import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import RoundIconBtn from '../Components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from '../Components/ThemeProvider'

const EditNote = ({ navigation }) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const getOldData = async () => {
        var result = await AsyncStorage.getItem('editnote');
        var oldnote = JSON.parse(result)
        setTitle(oldnote.title)
        console.log(title)
        setDesc(oldnote.desc)
    }

    useFocusEffect(
        useCallback(() => {
            getOldData();
        }, []))

    const cancel = () => {
        navigation.goBack()
    }

    const { theme } = useTheme()

    const submitNote = async () => {
        var result = await AsyncStorage.getItem('editnote');
        var oldnote = JSON.parse(result)
        const results = await AsyncStorage.getItem('DATA');
        const notes = JSON.parse(results)
        const prevNotes = notes.filter(n => n.id !== oldnote.id);
        const editedNote = { id: oldnote.id, title: title, desc: desc, time: Date.now() }
        let updatedNotes = [...prevNotes, editedNote];
        await AsyncStorage.setItem('DATA', JSON.stringify(updatedNotes));
        await AsyncStorage.setItem('editnote', JSON.stringify(editedNote));
        navigation.goBack()
        setTitle('')
        setDesc('')
    };

    return (
        <View style={styles.Modalcontainer}>

            <TextInput style={[styles.Modalinput, styles.Modaltitle]}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput style={[styles.Modalinput, styles.Modalnote]}
                multiline
                value={desc}
                onChangeText={setDesc}
            />

            <View style={styles.ModalBtnContainer}>
                <RoundIconBtn style={styles.ModalcheckBtn}
                    size={20}
                    antIconName='check'
                    onPress={submitNote}
                />

                <RoundIconBtn
                    size={20}
                    antIconName='close'
                    onPress={cancel}
                    style={{ backgroundColor: theme.error }}
                />
            </View>
        </View>
    )
}

export default EditNote

const wid = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    Modalcontainer: {
        marginTop: 30,
        alignItems: 'center'
    },
    Modalinput: {
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 15,
        width: wid,
        padding: 10,
        fontSize: 20,
    },
    Modaltitle: {
        height: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    Modalnote: {
        height: 250,
        textAlignVertical: 'top'
    },
    ModalcheckBtn: {
        marginRight: 15
    },
    ModalBtnContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        position: 'absolute',
        marginTop: 350
    }
})