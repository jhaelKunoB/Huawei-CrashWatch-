import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const LopA = require('../login/assets/LoginFondo.jpg');

export default function Register() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [terms, setTerms] = useState(false);

    const handleRegister = () => {
        console.log('Name:', name);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        console.log('Address:', address);
        console.log('Terms:', terms);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <View style={styles.termsContainer}>
                <TouchableOpacity onPress={() => setTerms(!terms)}>
                    <View style={styles.checkbox}>
                        {terms && <View style={styles.checkboxInner} />}
                    </View>
                </TouchableOpacity>
                <Text style={styles.termsText}>Accept terms and conditions</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007BFF',
    },
    termsText: {
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#00094b',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 24,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});