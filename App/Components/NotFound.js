import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from './ThemeProvider'

const NotFound = () => {

    const {theme} = useTheme()
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AntDesign name='frowno' size={90} color={theme.textColor} />
            <Text style={styles.text}>Result Not Found</Text>
        </View>
    )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1
    },
    text: {
        marginTop:20,
        fontSize:20
    }
})