import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
const { width } = Dimensions.get('window'); // Obtiene el ancho de la pantalla

const ReportCard = ({ report }) => {
  const [scale] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxDescriptionLength = 200; // Máximo número de caracteres a mostrar

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const isDescriptionLong = report.description.length > maxDescriptionLength;
  const descriptionToShow = showFullDescription
    ? report.description
    : report.description.substring(0, maxDescriptionLength) + (isDescriptionLong ? '...' : '');

  return (
    <TouchableOpacity
      style={styles.card}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => alert(`Detalles del incidente: ${report.name}`)}
    >
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
        {/* Contenedor para el avatar y nombre */}
        <View style={styles.userInfo}>
          <LottieView
               source={require('../assets/AnimPerfil.json')} // Recibe la URL de la animación
               autoPlay
               loop
               style={styles.avatar}
           />
           <View>
            <Text style={{fontSize:8, fontWeight:'300'}}>Reportado por</Text>
            <Text style={styles.userName}>{report.full_name}</Text>
           </View>
         
        </View>

        <Image source={{ uri: report.url }} style={styles.image} />

        <View style={styles.cardContent}>
          <Text style={styles.title}>{report.name}</Text>
          <Text style={styles.description}>{descriptionToShow}</Text>
          {isDescriptionLong && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMore}>{showFullDescription ? 'Ver menos' : 'Ver más'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.location}>Direccion: {report.address}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    width: width - 32,
    marginVertical: 16,
    backgroundColor: 'transparent',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  userInfo: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10, // Asegura que este contenedor esté sobre la imagen
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  userName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0F1035',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 20,
    backgroundColor:'#F1F8FF'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#0F1035',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
    marginBottom: 6,
  },
  readMore: {
    color: '#1E90FF',
    textAlign: 'right',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent:'center',
  },
  location: {
    fontSize: 12,
    color: '#777',
  },
});

export default ReportCard;
