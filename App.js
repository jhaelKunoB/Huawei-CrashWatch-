import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navigation from './src/navigator/navigation'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Navigation/>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
