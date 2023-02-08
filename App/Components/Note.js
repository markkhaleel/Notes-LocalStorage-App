import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from './ThemeProvider'

const Note = ({ item, onPress }) => {
    const { title, desc } = item
    const { theme } = useTheme()
    return (

        <TouchableOpacity
            onPress={onPress}
            style={[styles.notesContainer, { backgroundColor: theme.primary }]}>

            <Text numberOfLines={2} style={styles.listTitle}>{title}</Text>
            <Text numberOfLines={3}>{desc}</Text>

        </TouchableOpacity>
    )
}

export default Note

const wid = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    listTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17
    },
    notesContainer: {
        width: wid / 2 - 5,
        marginTop: 10,
        padding: 8,
        borderRadius: 10
    }
})