import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Maps() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.TextTitle}>Name</Text>
                <Text style={styles.TextTitle}>Good morning!</Text>
            </View>

            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>  <Feather name="map-pin" size={20} color="black" /> Ubicacion</Text>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => alert('¡Create New Report!')}
                    >
                        <Text style={styles.btnText}>Create New Report</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => alert('¡Check Accidents!')}
                    >
                        <Text style={styles.btnText}>Check Accidents</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 15,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textAlign: 'right',
        marginRight: 20
    },
    buttonContainer: {
        flexDirection: 'row',  // This keeps buttons in a row
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f8f9fa',
    },
    TextTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    btn: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
