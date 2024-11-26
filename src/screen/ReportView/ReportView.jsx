import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ReportView() {
    const [selectedTab, setSelectedTab] = useState('images'); // Alternar entre "images" y "video"
    const images = [
        'https://via.placeholder.com/300x150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
    ]; // Lista de imágenes de ejemplo

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>CrashWatcher</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => alert('ATRÁS')}
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
                        style={[
                            styles.tab,
                            selectedTab === 'video' && styles.activeTab,
                        ]}
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
                    {/* Sección de las imágenes o video */}
                    {selectedTab === 'images' ? (
                        <Image
                            source={{ uri: images[0] }}
                            style={styles.reportImage}
                        />
                    ) : (
                        <View style={styles.videoContainer}>
                            <Text>Aquí va el video</Text>
                        </View>
                    )}

                    {selectedTab === 'images' && images.length > 1 && (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.thumbnailContainer}
                        >
                            {images.slice(1).map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image }}
                                    style={styles.thumbnail}
                                />
                            ))}
                        </ScrollView>
                    )}

                    {/* Información del usuario */}
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/50' }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>User</Text>
                    </View>

                    {/* Detalles del reporte */}
                    <Text>Lugar</Text>
                    <Text>Description</Text>
                    <Text>Estado</Text>
                    <Text></Text>
                </View>
            </ScrollView>
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
        justifyContent: 'space-around', // Asegura que los botones sean del mismo tamaño
        width: '100%',
    },
    tab: {
        flex: 1, // Para asegurar que los botones ocupen el mismo espacio
        padding: 10,
        borderRadius: 5,
        alignItems: 'center', // Centra el texto en el botón
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
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    reportImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    thumbnailContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    videoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        backgroundColor: '#ddd',
        borderRadius: 10,
        marginBottom: 10,  // Asegura que haya espacio debajo del video
        padding: 10, // Espacio alrededor del video
    },
});
