import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoandingPage from './component/LoandingPage';

const LopA = require('../login/assets/LoginFondo.jpg');
const loginUser = require('../../helpers/api_invoker');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [useLoanding, setLoanding] = useState(false);

  const handleLogin = async () => {
    try {
      setLoanding(true);
      const user = { email, password };
      const userData = await loginUser.loginUser(user);

      if (userData.message === 'Usuario no encontrado') {
        alert('User not found');
        setLoanding(false);
        return;
      }

      if (userData.message === 'Contraseña incorrecta') {
        alert('Incorrect password');
        return;
      }

      await AsyncStorage.setItem('user', JSON.stringify(userData.user));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error login:', error);
    } finally {
      setLoanding(false);
    }
  };

  const handleRegister = () => navigation.navigate('Register');

  return (
    <ImageBackground style={styles.container} source={LopA}>
      <View style={styles.overlay}>
        <Text style={styles.title}>𝐂𝐫𝐚𝐬𝐡 𝐖𝐚𝐭𝐜𝐡</Text>

        <TextInput
          style={styles.input}
          placeholder="Email | Username"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleRegister}>
          <Text style={styles.secondaryButtonText}>Register</Text>
        </TouchableOpacity>

        <LoandingPage isVisible={useLoanding} onCloseSuccess={setLoanding} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo translúcido
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#1B3B74',
    textAlign: 'center',
    marginBottom: 40,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputPassword: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#1B3B74',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#eaeaea',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1B3B74',
    fontSize: 16,
    fontWeight: '600',
  },
});
