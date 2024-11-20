import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StartScreen = () => {

    const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Text>Inicio de Session  sfasf rqwwjlgag aga</Text>
      <TouchableOpacity style={styles.contButom} onPress={() => navigation.navigate('Home')}>
        <Text>
            Continuar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartScreen


const styles = StyleSheet.create({
    contButom:{
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'blue'
    },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
