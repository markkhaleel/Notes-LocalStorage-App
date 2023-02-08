import { View, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "./ThemeProvider";

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {

    const { theme } = useTheme();

    return <AntDesign
        name={antIconName}
        size={size || 25}
        color={color || theme.textColor}
        style={[{ borderRadius: 50, padding: 15, elevation: 5, backgroundColor: theme.primary }, { ...style }]}
        onPress={onPress}
    />
}

export default RoundIconBtn;