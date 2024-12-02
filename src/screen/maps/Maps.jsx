import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { getReport } from '../../helpers/api_invoker';
import MapViewComponent from './components/MapViewComponent';

export default function Maps() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      const reports = await getReport();
  
      if (reports && reports.length > 0) {
        // Agrupar reportes por idReport y combinar la información de nombre y descripción
        const groupedReports = {};
  
        reports.forEach(report => {
          if (!groupedReports[report.idReport]) {
            groupedReports[report.idReport] = {
              latitude: report.latitude,
              longitude: report.longitude,
              names: [],
              description: report.description
            };
          }
          groupedReports[report.idReport].names.push(report.name);
          
        });
  
        // Preparar los datos finales para mostrar en el mapa
        const formattedReportData = Object.keys(groupedReports).map(id => ({
          id,
          latitude: groupedReports[id].latitude,
          longitude: groupedReports[id].longitude,
          name: groupedReports[id].names.join(' - '),
          description: groupedReports[id].description
        }));
  
        setReportData(formattedReportData);
      }
  
      console.log('Respuesta: ', reports);
    };
  
    getReports();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.TextTitle}>Name</Text>
        <Text style={styles.TextTitle}>Good morning!</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          <Feather name="map-pin" size={20} color="black" /> Ubicacion
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => alert('¡Create New Report!')}
          >
            <Text style={styles.btnText}>Create New Report</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => alert('¡Check Accidents!')}
          >
            <Text style={styles.btnText}>Check Accidents</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.container}>
        <MapViewComponent reportData={reportData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 15,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'right',
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  TextTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
