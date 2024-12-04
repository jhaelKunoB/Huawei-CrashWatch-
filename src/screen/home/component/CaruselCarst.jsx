import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import CarInfo from './CarInfo';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';


// Configurar el registrador de reanimación
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn, // Muestra advertencias y errores
  strict: true,                   // Modo estricto activado
});


const { width } = Dimensions.get('window'); // Obtiene el ancho de la pantalla

const data = [
  { id: 1, title: "Accidentes Automovilísticos", description: "Reporta accidentes y agiliza la respuesta", image: require('../assets/AnimAccident.json') },
  { id: 2, title: "Incendios", description: "Informa sobre incendios para una respuesta inmediata", image: require('../assets/AnimFireHose.json') },
  { id: 3, title: "Emergencias Médicas", description: "Solicita asistencia médica rápida y precisa", image: require('../assets/Ambulancia.json') },
];

const CaruselCarts = () => {
  return (
    <View style={styles.screen}>
      {/* Contenedor del carrusel */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop = {true}
          width={width}
          height={140}
          autoPlay={true}
          data={data}
          scrollAnimationDuration={6000}
          renderItem={({ item }) => (
            <CarInfo
              title={item.title}
              description={item.description}
              animationUrl={item.image}
            />
          )}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  carouselContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  additionalContent: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default CaruselCarts;
