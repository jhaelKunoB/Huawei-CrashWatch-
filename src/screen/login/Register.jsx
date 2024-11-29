import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const LopA = require('../login/assets/LoginFondo.jpg');

import createUser from '../../helpers/api_invoker';

export default function Register() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [terms, setTerms] = useState(false);
    const [username, setUsername] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [ci, setCi] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = () => {
        if (!name || !lastName || !email || !password || !confirmPassword || !address || !username || !latitude || !longitude || !ci || !phone) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        //verificar con regex el email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Invalid email.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        if (!terms) {
            Alert.alert('Error', 'You must accept the terms and conditions.');
            return;
        }

        const user = {
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            address: address,
            terms: terms,
            username: username,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            ci: parseInt(ci, 10),
            phone: parseInt(phone, 10),
            idCounty: 1,
            idRol: 3
        };

        createUser(user);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="CI"
                    value={ci}
                    onChangeText={setCi}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#333" marginLeft={7} marginBottom={7} />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#333" marginLeft={7} marginBottom={9} />
                    </TouchableOpacity>
                </View>


                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    value={latitude}
                    onChangeText={setLatitude}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    value={longitude}
                    onChangeText={setLongitude}
                    keyboardType="numeric"
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    showPasswordText: {
        marginLeft: 8,
        color: '#007BFF',
    },
    inputPassword: {
        flex: 1,
        height: 50,
        fontSize: 16,
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