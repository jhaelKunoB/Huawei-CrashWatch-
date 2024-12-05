import AsyncStorage from '@react-native-async-storage/async-storage';

const getCredentials = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    console.log('jsonValue:', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving credentials', e);
    return null;
  }
};

export default getCredentials;