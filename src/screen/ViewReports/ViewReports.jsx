import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getReportsName } from '../../helpers/api_invoker';
import UserAvatar from 'react-native-user-avatar';
import { useEffect, useState } from 'react';

export default function ViewReports() {
    const [reports, setReports] = useState([]); // Almacena los reportes en un estado

    useEffect(() => {
        const getReportsNames = async () => {
            try {
                const reportsData = await getReportsName(); // Obtén los datos de la API
                console.log('Respuesta: ', reportsData);
    
                if (reportsData && reportsData.length > 0) {
                    // Agrupar los reportes por idReport
                    const groupedReports = {};
    
                    reportsData.forEach(report => {
                        if (!groupedReports[report.id]) {
                            groupedReports[report.id] = {
                                names: new Set(),  // Usamos Set para evitar duplicados
                                description: report.description,
                                imageUrl: report.url,
                                full_name: report.full_name,
                                //location: report.location, // Si tienes información de la ubicación
                            };
                        }
    
                        groupedReports[report.id].names.add(report.name); // Agregar sin duplicar
                    });
    
                    // Convertir el objeto agrupado a un array
                    const formattedReports = Object.keys(groupedReports).map(id => ({
                        idReport: id,
                        name: Array.from(groupedReports[id].names).join(' - '), // Unir los nombres sin duplicados
                        descriptions: groupedReports[id].description,
                        imageUrl: groupedReports[id].imageUrl,
                        full_name: groupedReports[id].full_name,
                        location: groupedReports[id].location,
                    }));
    
                    setReports(formattedReports); // Guarda los reportes agrupados
                }
            } catch (error) {
                console.error('Error al obtener los reportes:', error);
            }
        };
    
        getReportsNames();
    }, []);

    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>CrashWatcher</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigator.navigate("Report")}
                >
                    <Text style={styles.btnText}>Create New Report</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {reports.map((report, index) => ( // Mapea los reportes para mostrar cada uno
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigator.navigate("ReportView", { reportId: report.idReport })}
                    >
                        <View style={styles.card}>
                            <View style={styles.userInfo}>
                                <UserAvatar
                                    style={styles.profileImage}
                                    size={50}
                                    name={report.full_name} // Usa el nombre dinámicamente
                                />
                                <View>
                                    <Text style={styles.userName}>{report.full_name}</Text>
                                    <Text style={styles.location}>{report.name}</Text>
                                </View>
                            </View>

                            <Image
                                source={{ uri: report.imageUrl || "https://via.placeholder.com/300x150" }}
                                style={styles.reportImage}
                            />

                            <Text style={styles.description}>
                                {report.descriptions || "No description available."}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    scrollContainer: {
        padding: 10,
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
        elevation: 5,
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
