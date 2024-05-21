import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Alert,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
} from "react-native";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../../firebase/hooks/useAuth";
import useCollection from "../../firebase/hooks/useCollection";
import Animal from "../../types/Pets";
import Header from "../../components/ui/Header";

export default function Cars() {
    const { showActionSheetWithOptions } = useActionSheet();
    const { logout } = useAuth();
    const { data, create, remove, refreshData, loading } = useCollection<Animal>("animais");

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
    const [forms, setForms] = useState<Animal>({
        type: "",
        name: "",
        age: 0,
    });

    const handleInputChange = (field: string, value: string | number) => {
        setForms((prevForms) => ({ ...prevForms, [field]: value }));
    };

    const quandoSalvar = async () => {
        try {
            await create(forms);
            refreshData();
        } catch (error: any) {
            Alert.alert("Create Animal Error", error.toString());
        }
    };

    const quandoRemover = async (id: string | undefined) => {
        if (id) { 
            await remove(id);
            refreshData();
        } else {
            Alert.alert(
                "Error",
                "Erro ao tentar remover o animal"
            );
        }
    };
    const quandoEditar = async (id: string | undefined) => {
        if (id) {
            router.replace(`/animal/${id}/`);
        } else {
            Alert.alert(
                "View Error",
                "Erro ao tentar editar animal"
            );
        }
    };

    const renderHeader = () => (
        <View style={styles.listHeader}>
            <Text style={styles.headerText}>Tipo</Text>
            <Text style={styles.headerText}>Nome</Text>
            <Text style={styles.headerText}>Idade</Text>
            <View style={styles.headerIconContainer}></View>
        </View>
    );

    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Header onPress={quandoDeslogar} />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.scrollViewContent}>
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
                        <Text style={styles.buttonText}>Cadastrar novo animal</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        data={data}
                        ListHeaderComponent={renderHeader}
                        renderItem={({item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.listText}>{item.type}</Text>
                                <Text style={styles.listText}>{item.name}</Text>
                                <Text style={styles.listText}>{item.age}</Text>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity
                                        onPress={() => quandoEditar(item.id)}
                                    >
                                        <Ionicons name="pencil" size={20} color="#0000ff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => quandoRemover(item.id)} 
                                    >
                                        <Ionicons name="trash" size={20} color="#ff0000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
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
    listContainer: {
        width: '95%',
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 10,
    },
    headerText: {
        width:"100%",
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    headerIconContainer: {
        width: 60,
    },
    listItem: {
        width:"100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#00cccc',
        borderRadius: 10,
        marginBottom: 4,
        elevation: 10,
    },
    listText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 60,
    },
});
