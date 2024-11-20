import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Login


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
