import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserAvatar from 'react-native-user-avatar';
import { Video, Audio } from 'expo-av'; // Importamos el componente de video
import { getReportById } from '../../helpers/api_invoker';

export default function ReportView() {
    const [reportDetails, setReportDetails] = useState(null); // Estado para almacenar los detalles del reporte
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Índice de la imagen seleccionada
    const [videoModalVisible, setVideoModalVisible] = useState(false); // Estado para controlar el modal del video
    const navigation = useNavigation();
    const route = useRoute();
    const { reportId } = route.params; // Obtener el ID del reporte

    const [sound, setSound] = useState(null); // Estado para el sonido

    const playSound = async () => {
        if (!reportDetails || !reportDetails.audio) return; // Verificar que el audio existe

        try {
            console.log('Cargando audio');
            console.log(reportDetails.audio);
            const { sound } = await Audio.Sound.createAsync(
                { uri: reportDetails.audio } // Usamos la URL del audio
            );
            setSound(sound);
            console.log('Reproduciendo audio');
            await sound.playAsync();
        } catch (error) {
            console.error('Error al reproducir audio:', error);
        }
    };

    useEffect(() => {
        return () => {
            if (sound) {
                console.log('Deteniendo y descargando audio');
                sound.unloadAsync();
            }
        };
    }, [sound]);

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
                        audio: reportData[0].audio,
                    };

                    reportData.forEach((report) => {
                        groupedReport.names.add(report.name);
                        groupedReport.images.push(report.url);
                    });

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
            setSelectedImageIndex((prevIndex) => {
                const nextIndex = prevIndex === reportDetails.images.length - 1 ? 0 : prevIndex + 1;
                return nextIndex;
            });
        } else if (direction === 'right') {
            setSelectedImageIndex((prevIndex) => {
                const prevIndexValid = prevIndex === 0 ? reportDetails.images.length - 1 : prevIndex - 1;
                return prevIndexValid;
            });
        }
    };

    const openVideoModal = () => {
        setVideoModalVisible(true);
    };

    const closeVideoModal = () => {
        setVideoModalVisible(false);
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
                    onPress={() => navigation.navigate('Report')}
                >
                    <Ionicons name="arrow-back-circle-sharp" size={38} color="darkblue" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerCard}>
                    <View style={styles.userInfo}>
                        <UserAvatar
                            style={styles.profileImage}
                            size={45}
                            name={reportDetails.full_name}
                        />
                        <Text style={styles.userName}>{reportDetails.full_name}</Text>
                    </View>

                    <View style={styles.detailCard}>
                        <Text style={styles.detailLabel}>Accidentes relacionados:</Text>
                        <Text style={styles.detailText}>
                            {reportDetails.names.join(', ') || 'No especificado'}
                        </Text>
                        <Text style={styles.detailLabel}>Descripción:</Text>
                        <Text style={styles.detailText}>{reportDetails.description}</Text>
                    </View>

                    <TouchableOpacity onPress={() => openImageModal(0)}>
                        <Image
                            source={{
                                uri: reportDetails.images[0] || 'https://via.placeholder.com/300x150',
                            }}
                            style={styles.reportImage}
                        />
                    </TouchableOpacity>

                    {reportDetails.video && (
                        <TouchableOpacity style={styles.audioButton} onPress={openVideoModal}>
                            <Ionicons name="play-circle" size={40} color="darkblue" />
                            <Text style={styles.audioButtonText}>Reproducir Video</Text>
                        </TouchableOpacity>
                    )}

                    {reportDetails.audio && (
                        <TouchableOpacity style={styles.audioButton} onPress={playSound}>
                            <Ionicons name="mic" size={40} color="darkblue" />
                            <Text style={styles.audioButtonText}>Reproducir audio</Text>
                        </TouchableOpacity>
                    )}
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
                        <TouchableOpacity onPress={() => handleSwipe('left')}>
                            <Image
                                source={{ uri: reportDetails.images[selectedImageIndex] }}
                                style={styles.modalImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal para el video */}
            <Modal
                visible={videoModalVisible}
                onRequestClose={closeVideoModal}
                animationType="slide"
                transparent={false}
            >
                <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeVideoModal}
                    >
                        <Ionicons name="close-circle" size={40} color="white" />
                    </TouchableOpacity>
                    <Video
                        source={{ uri: reportDetails.video }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay
                        useNativeControls
                        style={{ width: '100%', height: '70%' }}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        lineHeight: 20,
    },

    audioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        marginTop: 10
    },
    audioButtonText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
        fontWeight: 'bold',
    },

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
    reportImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    thumbnailContainer: {
        marginTop: 5,
        marginBottom: 5
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
    },
    profileImage: {
        marginRight: 10,
    },
    userName: {
        fontSize: 20,
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
        backgroundColor: 'black'
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
