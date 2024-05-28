import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    View,
    StyleSheet,
} from "react-native";
import FullScreen from "../components/containers/FullScreen";
import Logo from "../components/ui/Logo";
import Botao from "../components/ui/botao";
import { router } from "expo-router";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import useAuth from "../firebase/hooks/useAuth";
import { useTheme } from "./contexts/ThemeContext";

export default function Index() {
    const { user, login, loading } = useAuth();
    const [email, setEmail] = useState("teste@gmail.com");
    const [password, setPassword] = useState("123456");
const {themeStyles} = useTheme();
    useEffect(() => {
        if (user) {
            router.replace("/animal/");
        }
    }, [user]);

    if (loading) return (
        <FullScreen>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#008080" />
            </View>
        </FullScreen>
    );

    return (
        <ActionSheetProvider >
            <FullScreen >
                <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
                    <Logo />
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Usuário</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            placeholder="Digite seu nome de usuário"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Botao
                            onPress={async () => {
                                try {
                                    await login(email, password);
                                } catch (e: any) {
                                    console.error(e);
                                    Alert.alert('Login Error', e.toString());
                                }
                            }}
                        />
                    </View>
                </View>
            </FullScreen>
        </ActionSheetProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        marginTop: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 2,
        borderColor: '#008080',
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginTop: 48,
        width: '100%',
    },
});
