import { StatusBar } from "expo-status-bar";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions, Switch } from "react-native";
import RoundIconBtn from "../Components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../Components/ThemeProvider";
import { darkTheme, lightTheme } from "../misc/ThemeStyles";

export default function Intro({ navigation }) {

    const [name, setName] = useState('');
    const [switchValue, setSwitchValue] = useState(true)

    const handleSubmit = async () => {
        const user = { name: name }
        await AsyncStorage.setItem('USERNAME', JSON.stringify(user))
        navigation.navigate('ALLNOTES')
    }

    const { theme, setTheme } = useTheme();

    const toggleColorMode = () => {
        setSwitchValue(!switchValue)
        if (theme == lightTheme) {
            setTheme(darkTheme)
        } else {
            setTheme(lightTheme)
        }
    }

    return (
        <>
            <View style={[styles.Container, { backgroundColor: theme.backgroundColor }]}>
                <StatusBar hidden />
                <View>
                    <Text style={[styles.Text, { color: theme.textColor }]}>
                        Enter your Name to Continue
                    </Text>

                    <TextInput
                        placeholder="Enter Name"
                        value={name}
                        onChangeText={setName}
                        style={[styles.input, { borderColor: theme.primary, backgroundColor: 'white' }]}
                    />
                    {name.trim().length >= 3 &&
                        <RoundIconBtn antIconName={'arrowright'}
                            onPress={handleSubmit}
                            style={styles.nextBtn} />}
                </View>
                <Switch style={{ marginTop: 100 }} value={switchValue} onValueChange={toggleColorMode} />
            </View>
        </>
    )
}

const wid = Dimensions.get('window').width

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        height: 40,
        paddingLeft: 5,
        width: wid - 50,
        borderRadius: 10,
        fontSize: 20,
        marginBottom: 25
    },
    Text: {
        marginBottom: 20,
        opacity: 0.5,
    },
    lightContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextBtn: {
        position: 'absolute',
        marginTop: 100,
        marginLeft: 160
    }
})
