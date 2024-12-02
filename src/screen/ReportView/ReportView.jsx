import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserAvatar from 'react-native-user-avatar';
import { Video } from 'expo-av'; // Importamos el componente de video
import { getReportById } from '../../helpers/api_invoker';

export default function ReportView() {
    const [selectedTab, setSelectedTab] = useState('images'); // Alternar entre "images" y "video"
    const [reportDetails, setReportDetails] = useState(null); // Estado para almacenar los detalles del reporte
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal de la imagen
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Índice de la imagen seleccionada
    const navigation = useNavigation();
    const route = useRoute();
    const { reportId } = route.params; // Obtener el ID del reporte

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const reportData = await getReportById(reportId);

                if (reportData && reportData.length > 0) {
                    const groupedReport = {
                        names: new Set(),
                        description: reportData[0].description,
                        images: [],
                        full_name: reportData[0].full_name,
                        video: reportData[0].video,
                    };

                    reportData.forEach((report) => {
                        groupedReport.names.add(report.name);
                        groupedReport.images.push(report.url);
                    });

                    // Convertimos el Set de nombres a un arreglo para facilitar el renderizado
                    groupedReport.names = Array.from(groupedReport.names);
                    setReportDetails(groupedReport);
                }
            } catch (error) {
                console.error('Error al obtener detalles del reporte:', error);
            }
        };

        fetchReportDetails();
    }, [reportId]);

    const openImageModal = (index) => {
        setSelectedImageIndex(index);
        setModalVisible(true);
    };

    const closeImageModal = () => {
        setModalVisible(false);
    };

    const handleSwipe = (direction) => {
        if (direction === 'left') {
            // Mover a la siguiente imagen
            setSelectedImageIndex((prevIndex) => {
                const nextIndex = prevIndex === reportDetails.images.length - 1 ? 0 : prevIndex + 1;
                return nextIndex;
            });
        } else if (direction === 'right') {
            // Mover a la imagen anterior
            setSelectedImageIndex((prevIndex) => {
                const prevIndexValid = prevIndex === 0 ? reportDetails.images.length - 1 : prevIndex - 1;
                return prevIndexValid;
            });
        }
    };

    if (!reportDetails) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Cargando detalles del reporte...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>CrashWatcher</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-circle-sharp" size={38} color="darkblue" />
                </TouchableOpacity>
            </View>

            <View style={styles.headercard}>
                <View style={styles.tabCard}>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedTab === 'images' && styles.activeTab,
                        ]}
                        onPress={() => setSelectedTab('images')}
                    >
                        <Text
                            style={selectedTab === 'images' ? styles.activeTabText : styles.tabText}
                        >
                            Imágenes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'video' && styles.activeTab]}
                        onPress={() => setSelectedTab('video')}
                    >
                        <Text
                            style={selectedTab === 'video' ? styles.activeTabText : styles.tabText}
                        >
                            Video
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    {selectedTab === 'images' ? (
                        <>
                            {/* Imagen principal con modal */}
                            <TouchableOpacity onPress={() => openImageModal(0)}>
                                <Image
                                    source={{
                                        uri: reportDetails.images[0] || 'https://via.placeholder.com/300x150',
                                    }}
                                    style={styles.reportImage}
                                />
                            </TouchableOpacity>

                            {reportDetails.images.length > 1 && (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.thumbnailContainer}
                                >
                                    {reportDetails.images.slice(1).map((image, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => openImageModal(index + 1)} // Abre la imagen grande
                                        >
                                            <Image
                                                source={{ uri: image }}
                                                style={styles.thumbnail}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}
                        </>
                    ) : (
                        <View style={styles.videoContainer}>
                            {reportDetails.video ? (
                                <Video
                                    source={{ uri: reportDetails.video }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="contain"
                                    shouldPlay
                                    useNativeControls
                                    style={{ width: '100%', height: 200 }}
                                />
                            ) : (
                                <Text>No hay video disponible.</Text>
                            )}
                        </View>
                    )}

                    <View style={styles.userInfo}>
                        <UserAvatar
                            style={styles.profileImage}
                            size={50}
                            name={reportDetails.full_name}
                        />
                        <Text style={styles.userName}>{reportDetails.full_name}</Text>
                    </View>

                    <Text>Accidentes relacionados: {reportDetails.names.join(', ') || 'No especificado'}</Text>
                    <Text>Descripción: {reportDetails.description}</Text>
                </View>
            </ScrollView>

            {/* Modal para la imagen grande */}
            <Modal
                visible={modalVisible}
                onRequestClose={closeImageModal}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeImageModal}
                    >
                        <Ionicons name="close-circle" size={40} color="white" />
                    </TouchableOpacity>
                    <View style={styles.imageWrapper}>
                        {/* Solo una imagen a la vez */}
                        <TouchableOpacity
                            onPress={() => handleSwipe('left')} // Swipe para la imagen siguiente
                        >
                            <Image
                                source={{ uri: reportDetails.images[selectedImageIndex] }}
                                style={styles.modalImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 10,
    },
    headercard: {
        paddingTop: 10,
        paddingLeft: 50,
        paddingRight: 50,
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
    tabCard: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    tab: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: 'darkblue',
    },
    tabText: {
        color: 'gray',
        fontWeight: 'bold',
    },
    activeTabText: {
        color: 'white',
    },
    reportImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    thumbnailContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    profileImage: {
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    videoContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro
    },
    imageWrapper: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 20,
    },
});
