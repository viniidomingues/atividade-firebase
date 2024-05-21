import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type BotaoProps = TouchableOpacityProps & {
    onPress: () => void; 
};

const MenuHamburguer: React.FC<BotaoProps> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons  name="menu" size={40} color="#ffffff" onPress={onPress} />
        </TouchableOpacity>
    );
}

export default MenuHamburguer;
