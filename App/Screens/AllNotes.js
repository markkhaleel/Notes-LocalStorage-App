import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchBar from '../Components/SearchBar'
import RoundIconBtn from '../Components/RoundIconBtn'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect } from '@react-navigation/native'
import Note from '../Components/Note'
import NotFound from '../Components/NotFound'
import { useTheme } from '../Components/ThemeProvider'

const AllNotes = ({ navigation }) => {

  const [greet, setGreet] = useState('')
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [resultNotFound, setResultNotFound] = useState(false)

  const changeGreet = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) {
      setGreet('Morning')
    }
    else if (hrs > 12 && hrs < 17) {
      setGreet('Afternoon')
    }
    else (
      setGreet('Evening')
    )
  }

  const getSavedNotes = async () => {
    const result = await AsyncStorage.getItem('DATA');
    if (result != null) { setNotes((JSON.parse(result))) }
    else { setNotes([]) }
  }

  const findUser = async () => {
    const result = await AsyncStorage.getItem('USERNAME');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSavedNotes();
      findUser();
      changeGreet();
    }, [])
  )

  const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };

  const reversedNotes = reverseData(notes)

  const renderItem = ({ item }) => <Note onPress={() => openNotes(item)} item={item} />;

  const openNotes = (note) => {
    navigation.navigate('NOTEDETAIL', { note })
  }

  const handleOnSearchInput = text => {
    setSearchQuery(text);


    if (!text.trim()) {
      setResultNotFound(false);
      getSavedNotes();
    }


    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    })
    if (filteredNotes.length) {
      setNotes([...filteredNotes])
    } else {
      setResultNotFound(true)
    }
  }

  const handleOnClear = () => {
    setSearchQuery('');
    getSavedNotes();
    setResultNotFound(false)
  }
  const { theme } = useTheme()

  return (
    <>
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.header, { color: theme.textColor }]}>{`Good ${greet} ${user.name}`}</Text>

          {notes.length !== 0 ?
            <SearchBar value={searchQuery}
              onChangeText={handleOnSearchInput}
              onClear={handleOnClear} /> : null}

          {resultNotFound ? <NotFound /> :

            <FlatList data={reversedNotes}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              ListHeaderComponentStyle={{ fontWeight: 'bold' }} />}

          {!notes.length ?
            <View style={[StyleSheet.absoluteFillObject, styles.emptyheaderContainer]}>
              <Text style={styles.emptyheader}>Add Notes</Text>
            </View> : null}

        </View>
      </TouchableWithoutFeedback>

      <RoundIconBtn antIconName='plus'
        style={styles.addBtn}
        onPress={() => navigation.navigate('NOTEINPUT')} />

      <RoundIconBtn antIconName='edit'
        style={styles.editBtn}
        size={22}
        onPress={() => navigation.navigate('INTRO')}
        color={'white'} />
    </>
  )
}
export default AllNotes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 35,
  },
  emptyheaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyheader: {
    fontSize: 30,
    textTransform: 'uppercase',
    marginTop: 10,
    fontWeight: 'bold',
    opacity: 0.5,
    zIndex: -1
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50
  },
  deleteBtn: {
    position: 'absolute',
    right: 15,
    bottom: 120
  },
  editBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
    opacity: 0.7,
    padding: 7
  }
})