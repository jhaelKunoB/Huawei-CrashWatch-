import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navigation from './src/navigator/navigation'
import getAuth from './src/controler/getAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const auth = await AsyncStorage.getItem('user');
      const user = auth ? JSON.parse(auth) : null;
      setUser(user);
      console.log('User de App:', user);
    };

    fetchAuth();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Navigation user1={user}/>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '8%',
  },
});
