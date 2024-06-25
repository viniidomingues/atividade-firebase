import React from 'react';
import { Image, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';


type BotaoProps = TouchableOpacityProps & {
    onPress: () => void; 
};

const Botao: React.FC<BotaoProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} testID="teste-botao">
            <Image 
                source={require("../../assets/images/entrar.gif")}
                style={styles.image}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center', 
        borderRadius: 20, 
    },
    image: {
        width: 330,
        height: 100,
        borderRadius: 20
    }
});

export default Botao;
