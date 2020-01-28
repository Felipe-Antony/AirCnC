import React, { useState } from 'react';
import { SafeAreaView, AsyncStorage, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
    const [ date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handelSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date,
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada!');

        navigation.navigate('List');
    }

    function handelCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={style.container}>
             <Text style={style.label}>Data de Interesse *</Text>
                <TextInput 
                    style={style.input}
                    placeholder='Qual data você quer reservar?'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity onPress={handelSubmit} style={style.button}>
                    <Text style={style.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handelCancel} style={[style.button, style.cancelbutton]}>
                    <Text style={style.buttonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    cancelbutton: {
        backgroundColor: '#ccc',
        marginTop: 10
    }
});