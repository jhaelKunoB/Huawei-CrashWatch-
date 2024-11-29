import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapViewComponent() {
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Permission to access location was denied. Enable location services to use this feature.'
        );
        setLoading(false);
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1, // El mapa se actualizará cuando el usuario se mueva 1 metro
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setLoading(false);
        }
      );

      return () => subscription.remove();
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true} // Muestra la ubicación del usuario con un círculo azul
        >
          {/* Círculo de rango alrededor de la ubicación */}
          <Circle
            center={{ latitude: region.latitude, longitude: region.longitude }}
            radius={100} // Radio en metros
            strokeColor="rgba(0, 123, 255, 0.5)" // Color del borde
            fillColor="rgba(0, 123, 255, 0.2)" // Color de relleno
            strokeWidth={2} // Grosor del borde
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
