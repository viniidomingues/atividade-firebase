import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <View >
            <Text style={styles.logoText}>Animais</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    logoText: {
        fontSize: 24, 
        textTransform: 'uppercase',

    }
});

export default Logo;
