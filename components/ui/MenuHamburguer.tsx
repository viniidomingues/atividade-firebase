import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../../app/contexts/ThemeContext';

type BotaoProps = TouchableOpacityProps & {
    onPress: () => void; 
};


const MenuHamburguer: React.FC<BotaoProps> = ({ onPress }) => {
    const {themeStyles} = useTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons  name="menu" size={40} color={themeStyles.textColor} onPress={onPress} />
        </TouchableOpacity>
    );
}

export default MenuHamburguer;
