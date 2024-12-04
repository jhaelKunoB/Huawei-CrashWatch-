import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

// Componente que recibe título, descripción y URL de la animación
const CarInfo = ({ title, description, animationUrl }) => {
    return (
        <View style={{ paddingHorizontal: 25 }}>
            <View style={styles.containerCar}>
                {/* Contenedor para el texto */}
                <View style={styles.textContainer}>
                    <Text style={styles.title1}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>

                {/* Contenedor para la animación */}
                <View style={styles.animationContainer}>
                    <LottieView
                        source={animationUrl} // Recibe la URL de la animación
                        autoPlay
                        loop
                        style={styles.animation}
                    />
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    containerCar: {
        borderRadius: 21,
        borderWidth: 2,
        flexDirection: 'row', // Coloca elementos en fila
        alignItems: 'center', // Centra verticalmente los elementos
        justifyContent: 'space-between', // Deja espacio entre texto y animación
        paddingHorizontal: 3, // Espaciado alrededor
        paddingVertical: 5,
        borderColor: '#1C325B',
        marginVertical: 5,
    },
    textContainer: {
        flex: 1, // Toma el espacio disponible
        paddingLeft: 10,
    },
    title1: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#666', // Gris oscuro
    },
    animationContainer: {
        width: 160, // Ajusta el tamaño de la animación
        height: 100,
    },
    animation: {
        width: '100%',
        height: '100%',
    },
});

export default CarInfo;
