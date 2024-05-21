import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Alert,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
} from "react-native";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useActionSheet } from '@expo/react-native-action-sheet';
import useAuth from "../../../firebase/hooks/useAuth";
import useDocument from "../../../firebase/hooks/useDocument";
import Animal from "../../../types/Pets";
import Header from "../../../components/ui/Header";
import FullScreen from "../../../components/containers/FullScreen";

export default function Edit() {
    const { showActionSheetWithOptions } = useActionSheet();
    const { logout } = useAuth();
    const { id } = useGlobalSearchParams();
    const { data: pet, loading, upsert } = useDocument<Animal>("animais", id as string);

    const [forms, setForms] = useState<Animal>({
        type: "",
        name: "",
        age: 0,
    });

    useEffect(() => {
        if (pet) {
            setForms({
                type: pet.type || "",
                name: pet.name || "",
                age: pet.age || 0,
            });
        }
    }, [pet]);

    const quandoDeslogar = async () => {
        const options = ['Logout', 'Cancelar']; 
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 1; 
    
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex, 
                destructiveButtonIndex,
            },
            async (selectedIndex) => {
                if (selectedIndex === destructiveButtonIndex) {
                    try {
                        await logout();
                        router.replace('/');
                    } catch (e: any) {
                        console.error(e);
                        Alert.alert("Logout Error", e.toString());
                    }
                }
               
            }
        );
    };
    

    const quandoSalvar = async () => {
        try {
            await upsert(forms);
            Alert.alert("Meus Animais", "Editado com sucesso");
        } catch (error: any) {
            Alert.alert("Erro ao tentar editar animal", error.toString());
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        setForms((prevForms) => ({ ...prevForms, [field]: value }));
    };

    if (loading || !pet) {
        return (
            <FullScreen>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </FullScreen>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Header onPress={quandoDeslogar} />
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        value={forms.type}
                        placeholder="Digite o tipo do animal"
                        onChangeText={(text) => handleInputChange('type', text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={forms.name}
                        placeholder="Digite o nome do animal"
                        onChangeText={(text) => handleInputChange('name', text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={forms.age.toString()}
                        keyboardType="numeric"
                        placeholder="Digite a idade do animal"
                        onChangeText={(text) => handleInputChange('age', Number(text))}
                    />
                    <TouchableOpacity
                        onPress={quandoSalvar}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.replace('/animal')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        elevation: 3,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#008080',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
