import { Stack } from 'expo-router';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React from 'react';
import { ThemeProviderContext } from './contexts/ThemeContext';

export default function Layout() {
    return (
        <ThemeProviderContext>
            <ActionSheetProvider>
                <Stack
                />
            </ActionSheetProvider>
        </ThemeProviderContext>
    );
}