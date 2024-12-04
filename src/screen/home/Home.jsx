import React, { useCallback, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CarInfo from './component/CarInfo';
import CaruselCarts from './component/CaruselCarst';
import { getReportHome } from '../../helpers/api_invoker';
import { useFocusEffect } from '@react-navigation/native';
import ReportCard from './component/ReportCard';


import { useNavigation } from '@react-navigation/native';


import BottomModal from './component/BottomModal';
import * as Location from 'expo-location';





export default function Home() {
  const navigation = useNavigation();
  const [useReports, setReports] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);


  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      // Recupera la dirección utilizando las coordenadas
      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
      const fullAddress = address ? `${address.name}, ${address.city}, ${address.region}, ${address.country}` : 'Dirección no disponible';
      return fullAddress;
    } catch (error) {
      console.error('Error al recuperar la dirección:', error);
      throw new Error('No se pudo recuperar la dirección');
    }
  };


  useFocusEffect(
    useCallback(() => {
      const getReports = async () => {
        try {
          const response = await getReportHome();

          for (const report of response) {
            const address = await getAddressFromCoordinates(report.latitude, report.longitude);
            report.address = address;
          }
          
          setReports(response);
          console.log('Response:', response);
        } catch (error) {
          console.error('Error getting reports:', error);
        }
      };

      getReports();

      // Opcional: limpiar si es necesario
      return () => {
        console.log('Screen unfocused');
      };
    }, [])
  );



  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Buenos Días';
    } else if (currentHour < 18) {
      return 'Buenas Tardes';
    } else {
      return 'Buenas Noches';
    }
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={{flex:1}}>

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.titleText}>𝐂𝐫𝐚𝐬𝐡 𝐖𝐚𝐭𝐜𝐡</Text>
        <TouchableOpacity style={styles.userIcon} onPress={toggleModal} >
           <FontAwesome name="bars" size={23} color="#666"  />
        </TouchableOpacity>
      </View>
   
   
      <ScrollView style={styles.container}>


        {/* Mensajes */}
        <View style={styles.messages}>
          <Text style={styles.greeting}>Hi Jenifer!</Text>
          <Text style={styles.subGreeting}>{getGreeting()}</Text>
        </View>



        {/* Carrusel */}
        <View style={styles.carouselWrapper}>
          <CaruselCarts />
        </View>

        {/* Sección de accidentes nuevos */}
        <View style={styles.newAccidentsSection}>
          <Text style={{ fontSize: 20, fontWeight: '300' }}>Accidentes Recientes</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Ver Accidentes</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido adicional */}
        <View style={{ marginTop:10, marginBottom:100}}>

          {useReports.map((report, index) => (
            <ReportCard key={index} report={report} />
          ))}

        </View>
      </ScrollView>
      <BottomModal isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    height: 70, // Altura ajustada para un encabezado atractivo
    //marginBottom: 20,
    backgroundColor: '#E9F6FF', // Fondo claro para destacar el título
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra sutil para dar profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.8,
    //borderBottomWidth: 1, // Línea de separación inferior
    //borderBottomColor: '#ddd',
    paddingHorizontal: 20,
  },
  userIcon: {
    position: 'absolute',
    right: 40, // Posición en la parte izquierda del encabezado
    top: '30%',
    transform: [{ translateY: -10 }], // Centrado verticalmente
    padding:6
  },
  titleText: {
    fontSize: 28, // Tamaño más grande para mayor presencia
    fontWeight: 'bold',
    color: '#0B192C', // Azul oscuro elegante
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.15)', // Sombra ligera para profundidad
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },




  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    //paddingTop: 20,
  },
 
  messages: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
  },
  subGreeting: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(102, 102, 102, 0.6)',
    marginTop: 5,
  },
  newAccidentsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:15
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#0B192C',
    textAlign: 'right',
  },

  carouselWrapper: {
    height: 130,
  },

  
});
