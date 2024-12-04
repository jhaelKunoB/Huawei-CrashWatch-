import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getReport, getReportPasado } from '../../helpers/api_invoker';
import MapViewComponent from './components/MapViewComponent';
import MapViewHistory from './components/MapViewAntiguaComponent';

export default function Maps() {
  const [activeReports, setActiveReports] = useState([]);
  const [historicalReports, setHistoricalReports] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeMap, setActiveMap] = useState('activeAccidents'); // Controla qué mapa se muestra

  useEffect(() => {
    const fetchReports = async () => {
      // Obtener reportes activos
      const activeData = await getReport();
      if (activeData && activeData.length > 0) {
        const groupedReports = groupReports(activeData);
        setActiveReports(groupedReports);
      }

      // Obtener reportes históricos
      const historicalData = await getReportPasado();
      if (historicalData && historicalData.length > 0) {
        const groupedReports = groupReports(historicalData);
        setHistoricalReports(groupedReports);
      }
    };

    fetchReports();
  }, []);

  // Función para agrupar los reportes
  const groupReports = (reports) => {
    const groupedReports = {};
    reports.forEach((report) => {
      if (!groupedReports[report.idReport]) {
        groupedReports[report.idReport] = {
          latitude: report.latitude,
          longitude: report.longitude,
          names: [],
          description: report.description,
        };
      }
      groupedReports[report.idReport].names.push(report.name);
    });

    return Object.keys(groupedReports).map((id) => ({
      id,
      latitude: groupedReports[id].latitude,
      longitude: groupedReports[id].longitude,
      name: groupedReports[id].names.join(' - '),
      description: groupedReports[id].description,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.TextTitle}>Hello!</Text>
        <Text style={styles.TextTitle}>Current Location</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            activeMap === 'activeAccidents' && styles.activeButton,
          ]}
          onPress={() => setActiveMap('activeAccidents')}
        >
          <Text style={styles.btnText}>View Accidentes Actives</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            activeMap === 'historyAccidents' && styles.activeButton,
          ]}
          onPress={() => setActiveMap('historyAccidents')}
        >
          <Text style={styles.btnText}>History Accidents</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrar el mapa correspondiente */}
      {activeMap === 'activeAccidents' && (
        <MapViewComponent
          reportData={activeReports}
          onLocationUpdate={(location) => setCurrentLocation(location)}
        />
      )}
      {activeMap === 'historyAccidents' && (
        <MapViewHistory reportData={historicalReports} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    alignItems: 'center',
  },
  TextTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: '#0056b3', // Diferente color para el botón activo
  },
});
