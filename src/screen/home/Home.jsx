import { StyleSheet, View, Text } from 'react-native';


export default function Home() {
  return (
    <View styles={styles.container}>
        <Text>Este es mi Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
