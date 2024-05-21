import React from "react";
import { View, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import MenuHamburguer from "./MenuHamburguer";

type BotaoProps = TouchableOpacityProps & {
    onPress: () => void; 
};

const Header: React.FC<BotaoProps> = ({ onPress }) =>  {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Meus Animais</Text>
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
