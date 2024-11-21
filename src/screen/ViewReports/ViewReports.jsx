import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ViewReports() {

    const navigator = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>CrashWatcher</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => alert('Create new report')}
                >
                    <Text style={styles.btnText}>Create New Report</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    onPress={() => navigator.navigate("ReportView")}
                >
                    <View style={styles.card}>
                        <View style={styles.userInfo}>
                            <Image
                                source={{ uri: "https://via.placeholder.com/50" }} // Imagen del perfil
                                style={styles.profileImage}
                            />
                            <View>
                                <Text style={styles.userName}>User</Text>
                                <Text style={styles.location}>Provincia, Departamento</Text>
                            </View>
                        </View>

                        <Image
                            source={{ uri: "https://via.placeholder.com/300x150" }} // Imagen del accidente
                            style={styles.reportImage}
                        />

                        <Text style={styles.description}>
                            Accident reported: 2 injured were registered. Accident reported: 2
                            injured were registered. Accident reported: 2 injured were registered.
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa toda la pantalla
        backgroundColor: '#f5f5f5', 
        // Color de fondo para diferenciar las tarjetas
    },
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
    btn: {
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    btnText: {
        color: '#fff', // Color del texto del botón
        fontSize: 16,
    },
    scrollContainer: {
        padding: 10, // Espaciado interno para las tarjetas
        paddingBottom: 90, // Espacio adicional para evitar que las tarjetas sean tapadas
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Sombra en Android
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    location: {
        color: '#666',
        fontSize: 14,
    },
    reportImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
});
