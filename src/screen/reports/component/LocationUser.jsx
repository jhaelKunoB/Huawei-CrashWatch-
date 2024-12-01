import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LocationUser = ({ onRequestLocation, isLoading, Error }) => {
  return (

    // StyleSheet.flatten([styles.contImgesSelest, useErrorImges ? styles.ErrorImge : {}])
    <View style={StyleSheet.flatten([styles.containerUbica, Error ? styles.erroContain : {}])}>
      {isLoading ? (
        <>
          <View style={styles.leftSection}>
            <Text style={styles.title}>Ubicación Recibida</Text>
          </View>

          <LottieView
            source={require('../assets/SuccessAnim.json')} // Path to your Lottie file
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </>
      ) : (
        <>
          <View style={styles.leftSection}>
            <Text style={styles.title}>Necesitamos tu ubicación</Text>
            <Text style={styles.description}>
              Necesitamos tu ubicación para identificar el lugar del accidente y brindarte ayuda.
            </Text>
          </View>

          <View style={styles.rightSection}>
            <LottieView
              source={require('../assets/location.json')} // Path to your Lottie file
              autoPlay
              loop
              style={styles.lottieAnimation}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={onRequestLocation}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Permitir</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerUbica: {
    flexDirection: 'row', // Disposición horizontal
    paddingVertical: 10, // Menos padding vertical
    paddingHorizontal: 13, // Menos padding horizontal
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 15,
    elevation: 2,
  },
  erroContain:{
    shadowColor: 'red',
    shadowOpacity: 0,
    elevation: 10,
  },
  leftSection: {
    flex: 2,
    justifyContent: 'center',
    marginRight: 12,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16, // Texto más pequeño para el título
    fontWeight: '600',
    color: '#21273D',
    marginBottom: 6, // Menos margen inferior
  },
  description: {
    fontSize: 13, // Descripción más compacta
    color: '#21273D',
    marginBottom: 10, // Reducido para compactar
    lineHeight: 16, // Menor altura de línea
  },
  lottieAnimation: {
    width: 70, // Animación más pequeña
    height: 70,
    alignSelf: 'center',
    marginBottom:1,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12, // Texto pequeño pero legible
    fontWeight: '500',
  },
});

export default LocationUser;
