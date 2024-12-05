import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';


const CreateLoanding = ({ isVisible, onCloseSuccess }) => {
    const navigation = useNavigation()
  // Cambiar color de la barra de estado cuando el modal esté visible
  useEffect(() => {
    if (isVisible) {
      StatusBar.setBarStyle('light-content'); // Color blanco para el texto de la barra
      StatusBar.setBackgroundColor('#000000'); // Fondo negro para la barra de estado
    } else {
      StatusBar.setBarStyle('dark-content'); // Restaurar color de texto a negro cuando el modal se cierre
      StatusBar.setBackgroundColor('#FFFFFF'); // Restaurar color de fondo blanco
    }
  }, [isVisible]);

  const goBack = () => {
    console.log('Direccionamiento');
    navigation.navigate('Home')
    onCloseSuccess(false); 
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCloseSuccess}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            source={require('../assets/LoandingAnim.json')}  // Asegúrate de tener la animación en la carpeta assets
            autoPlay
            //loop={false}  // No se repite la animación
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Fondo ligeramente más oscuro
  },
  container: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 8,  // Bordes más sutiles
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,  // Tamaño más pequeño
    height: 150,  // Ajuste del tamaño
  },
  animation: {
    width: 90,  // Tamaño ajustado de la animación
    height: 90,
  },
  text: {
    marginTop: 15,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  buttonText: {
    marginTop: 15,
    fontSize: 15,
    color: '#2196F3',  // Color limpio para el botón
    fontWeight: '500',
  },
});

export default CreateLoanding;
