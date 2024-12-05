import React from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const SingoutModal = ({ openModalSing, setOpenModalSing }) => {

    const navigation = useNavigation();
    
    const deleteUser = async () => {
        try {
          await AsyncStorage.removeItem('user');
          console.log('User deleted');
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }

  return (
    <Modal visible={openModalSing} animationType='fade' transparent={true}>
      <View style={stylesM.ContModal}>
        <View style={stylesM.modalContent}>
          <Text style={stylesM.modalText}>
            Are you sure you want to log out?"
          </Text>

          {/* Botón de Eliminar Cuenta */}
          <TouchableOpacity style={stylesM.Deletebutton} onPress={() => deleteUser()}>
            <Text style={stylesM.DeletebuttonText}>Log Out</Text>
          </TouchableOpacity>

          {/* Botón de Cancelar que cierra el modal */}
          <TouchableOpacity
            style={stylesM.cancelButton}
            onPress={() => setOpenModalSing(false)}
          >
            <Text style={stylesM.CancelbuttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SingoutModal;

const stylesM = StyleSheet.create({
  ContModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // Mejorando la opacidad para el fondo
  },

  modalContent: {
    width: wp("100%"), // Usando wp para el ancho
    paddingVertical: hp("3%"), // Usando hp para el padding vertical
    backgroundColor: "white",
    
    alignItems: "center",
    borderColor:'#495464',
    borderTopWidth:3,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },

  modalText: {
    fontSize: hp("2%"), // Usando hp para el tamaño de texto
    textAlign: "center",
    marginBottom: hp("3%"), // Espacio con hp
    color: "#495464",
    fontWeight: "500",
  },

  Deletebutton: {
    paddingVertical: hp("1.5%"), // Usando hp para el padding vertical
    marginVertical: hp("1%"), // Usando hp para el margen vertical
    borderTopWidth: 0.5,
    borderColor: "#ababab",
    borderRadius: 5,
    width: wp("100%"), // Ancho del botón con wp
    alignItems: "center",
  },

  DeletebuttonText: {
    color: "red",
    fontSize: hp("2%"), // Usando hp para el tamaño de texto
  },

  cancelButton: {
    paddingVertical: hp("1.5%"), // Usando hp para el padding
    marginVertical: hp("1%"), // Usando hp para el margen
    marginBottom: hp("2%"), // Usando hp para el margen inferior
    borderRadius: 5,
    width: wp("100%"), // Ancho del botón con wp
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#ababab",
  },

  CancelbuttonText: {
    color: "#ababab",
    fontSize: hp("2%"), // Usando hp para el tamaño de texto
  },

  
});