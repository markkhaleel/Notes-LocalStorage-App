import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import RoundIconBtn from '../Components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../Components/ThemeProvider'


const NoteInput = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [desc, setdesc] = useState('')

  const saveNote = async () => {
    const result = await AsyncStorage.getItem('DATA')
    const prevNotes = JSON.parse(result)
    const note = { id: Date.now(), title: title, desc: desc, time: Date.now() }

    var updatedNotes = []
    if (prevNotes == null) {
      updatedNotes = [note];
    }
    else {
      updatedNotes = [...prevNotes, note]
    }

    await AsyncStorage.setItem('DATA', JSON.stringify(updatedNotes))
    setTitle('')
    setdesc('')
    navigation.navigate('ALLNOTES')
  }

  const closeNote = async () => {
    navigation.navigate('ALLNOTES')
  }

  const { theme } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TextInput style={[styles.input, styles.title, { borderColor: theme.primary }]}
        placeholder={'Title'}
        value={title}
        onChangeText={setTitle} />

      <TextInput style={[styles.input, styles.note, { borderColor: theme.primary }]}
        placeholder={'Note'}
        multiline
        value={desc}
        onChangeText={setdesc} />

      <View style={styles.BtnContainer}>
        {title.trim() && desc.trim() &&
          <RoundIconBtn style={styles.checkBtn}
            size={20}
            antIconName='check'
            onPress={saveNote} />}

        <RoundIconBtn
          size={20}
          antIconName='close'
          onPress={closeNote} />
      </View>
    </View>
  )
}

export default NoteInput

const wid = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: 'center'
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 15,
    width: wid,
    padding: 10,
    fontSize: 20,
    backgroundColor: 'white'
  },
  title: {
    height: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  note: {
    height: 250,
    textAlignVertical: 'top'
  },
  checkBtn: {
    marginRight: 15
  },
  BtnContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  }
})