import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const TypeReport = ({ typeReport, removeSelect }) => {
  return (
    <FlatList
      data={typeReport}
      renderItem={({ item }) => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between', // Asegura que el texto y el botón estén separados
            backgroundColor: '#DDE6ED',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 20,
            margin: 5,
            elevation: 2, // Sombra (en Android)
            shadowColor: '#000', // Sombra (en iOS)
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            flex: 1, // Permite que los elementos se ajusten al ancho disponible
          }}
        >
          <Text
            style={{
              flex: 1, // Permite que el texto use el espacio disponible
              fontSize: 12,
              color: '#27374D',
              fontWeight: '500',
              textTransform: 'uppercase',
              marginRight: 1, // Espacio entre el texto y el botón
            }}
          >
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => removeSelect(item)}
            style={{
                backgroundColor: '#fff', // Fondo blanco para contraste
                borderRadius: 50, // Hace que el fondo sea un círculo
                padding: 5, // Espaciado interno para que el ícono no esté pegado
                elevation: 2, // Sombra en Android
                shadowColor: '#000', // Sombra en iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            }}
            activeOpacity={0.7} // Efecto de opacidad al presionar
            >
            <AntDesign name="close" size={18} color="#ff5555" />
            </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Número de columnas
      columnWrapperStyle={{ justifyContent: 'space-between' }} // Espacio entre columnas
    />
  );
};

export default TypeReport;
