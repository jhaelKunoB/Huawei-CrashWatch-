import React, {useState, useEffect} from 'react';
import { Modal, View, Text, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

const RegisteringModal = ({ isVisible }) => {


    useEffect(() => {
        if (isVisible) {
          StatusBar.setBarStyle('light-content'); // Color blanco para el texto de la barra
          StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.6)'); // Fondo negro para la barra de estado
        } else {
          StatusBar.setBarStyle('dark-content'); // Restaurar color de texto a negro cuando el modal se cierre
          StatusBar.setBackgroundColor('#FFFFFF'); // Restaurar color de fondo blanco
        }
      }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Animación de Lottie */}
          <LottieView
            source={require('../assets/LoandingAnim.json')}  // Asegúrate de tener la animación en la carpeta assets
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.text}>Registrando...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140, // Tamaño equilibrado
    height: 130, // Altura adecuada
  },
  animation: {
    width: 110,  // Tamaño ajustado de la animación
    height: 90,
  },
  text: {
    fontSize: 15, // Tamaño normal del texto
    color: '#333',
    fontWeight: '300',
  },
});

export default RegisteringModal;
