import {Stack} from 'expo-router';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import React from 'react';

export default function Layout() {
    return (
        <ActionSheetProvider>
            <Stack
            />
        </ActionSheetProvider>
    );
}