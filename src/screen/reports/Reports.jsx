
import { StyleSheet, View, Text } from 'react-native';


export default function Reports() {
  return (
    <View style={styles.container}>
        <Text>Mis reportes</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
