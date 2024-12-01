import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

export default function MapViewComponent({ reportData }) {
  if (!reportData || reportData.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: reportData[0].latitude,
        longitude: reportData[0].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={true}
    >
      
      {reportData.map((report, index) => (
        <Marker
          key={report.id}
          coordinate={{ latitude: report.latitude, longitude: report.longitude }}
          title={report.name}
          description={report.description}
        />
        
      ))}
    </MapView>
  );
}

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
