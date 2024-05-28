import { View } from "react-native";
import React, { ReactNode } from "react";
import { Stack } from "expo-router";
import { useTheme } from "../../app/contexts/ThemeContext";

type FullScreenProps = {
    children: ReactNode;
};

export default function FullScreen({ children }: FullScreenProps) {
    const {themeStyles} = useTheme();
    return (
        <View className="flex-1 bg-white" style={{backgroundColor:themeStyles.backgroundColorFull}}>
            <Stack.Screen options={{ headerShown: false }} />

            {children}
        </View>
    );
}
