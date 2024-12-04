// BottomModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

const BottomModal = ({ isVisible, onClose, user }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
    >
      <View style={styles.content}>
        {/* Comprueba que 'user' tenga datos antes de mostrar la imagen */}
        {user?.image && (
          <Image source={{ uri: user.image }} style={styles.userImage} />
        )}
        <Text style={styles.userName}>
          {user?.name || 'Nombre no disponible'}
        </Text>
        <TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end', // Posiciona el modal en la parte inferior
    margin: 0, // Elimina el margen para que ocupe toda la pantalla
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  closeButtonContainer: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BottomModal;
