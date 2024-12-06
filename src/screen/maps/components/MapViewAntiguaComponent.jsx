import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const autoChoque = require('../assets/choquePin.png');
const peatonAtropello = require('../assets/peatonChoquePin.png');

const mapHomePin = require('../assets/mapHomePin.png');
const motoPin = require('../assets/motoPin.png');


export default function MapViewComponent({ reportData }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permiso denegado',
            'Se necesita acceso a la ubicación para mostrar el mapa.'
          );
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la ubicación.');
      } finally {
        setLoading(false);
      }
    };

    // Obtener la ubicación inicial
    getCurrentLocation();

    // Configurar un intervalo para actualizar la ubicación cada 5 minutos (300000 ms)
    const intervalId = setInterval(() => {
      getCurrentLocation();
      console.log("hola")
    }, 300000); // 5 minutos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentLocation && reportData) {
      reportData.forEach((report) => {
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          report.latitude,
          report.longitude
        );

        if (distance <= 250) { // Distancia en metros
          Alert.alert('Advertencia', `¡Ten Cuidado! zona con accidentes ocurridos ¡Ten Precaucion! (${report.name})`);
        }
      });
    }
  }, [currentLocation, reportData]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radio de la Tierra en metros
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distancia en metros
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!reportData || reportData.length === 0 || !currentLocation) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const getIconByName = (name) => {
    if (name.includes('Atropello de peatón')) {
      return peatonAtropello;
    } else if (name.includes('Choque entre vehículos')) {
      return autoChoque;
    } else if (name.includes('Incendios en el hogar')) {
      return mapHomePin;
    } else if (name.includes('Colisión con motocicleta')) {
      return motoPin;
    }
    return null;
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={true}
      customMapStyle={customMapStyle}
    >
      <Circle
        center={currentLocation}
        radius={250}
        strokeColor="rgba(0,122,255,0.5)"
        fillColor="rgba(0,122,255,0.2)"
      />

      {reportData.map((report) => (
        <Marker
          key={report.id}
          coordinate={{ latitude: report.latitude, longitude: report.longitude }}
          title={report.name}
          description={report.description}
          icon={getIconByName(report.name)} // Cambia el ícono dinámicamente
        />
      ))}
    </MapView>
  );
}

const customMapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }], // Oculta puntos de interés (POIs)
  },
  {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [{ visibility: 'off' }], // Oculta negocios
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }], // Oculta transporte público
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }], // Oculta nombres de calles
  },
];

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
