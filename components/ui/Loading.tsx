import React from 'react';
import { View, StyleSheet } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.fullScreen}></View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1, 
    }
});

export default Loading;
