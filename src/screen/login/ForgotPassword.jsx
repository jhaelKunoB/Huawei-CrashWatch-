// Interfaz de recuperacion de contraseña
import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        console.log('Email:', email);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Send Email" onPress={handleForgotPassword} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});