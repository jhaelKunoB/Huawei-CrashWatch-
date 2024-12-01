import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function ReportView() {
    const navigation = useNavigation()
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>CrashWatcher</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Report')}
                >
                    <Ionicons name="arrow-back-circle-sharp" size={38} color="darkblue"/>
                </TouchableOpacity>
            </View>

            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between', // Alinea los elementos en los extremos
        alignItems: 'center', // Centra verticalmente los elementos
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
})