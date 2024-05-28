import React from "react";
import { View, Text, StyleSheet, TouchableOpacityProps, TouchableOpacity } from "react-native";
import MenuHamburguer from "./MenuHamburguer";
import { useTheme } from "../../app/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

type BotaoProps = TouchableOpacityProps & {
    onPress: () => void; 
};

const Header: React.FC<BotaoProps> = ({ onPress }) =>  {

    const theme = useTheme();

    return (
        <View style={[styles.header, { backgroundColor: theme.themeStyles.headerColor }]}>
            <Text style={[styles.title, { color: theme.themeStyles.textColor }]}>Meus Animais</Text>
            <TouchableOpacity >
            <Ionicons  name="toggle" size={40} color={theme.themeStyles.textColor} onPress={theme.toggleTheme} />
            </TouchableOpacity>
            <MenuHamburguer onPress={onPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 20,
        backgroundColor: '#008080',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 24,
    },
});

export default Header;
