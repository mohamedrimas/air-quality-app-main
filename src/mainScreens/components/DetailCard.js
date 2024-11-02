import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';

const DetailCard = () => {
    const accuracy = 90; // You can replace this with dynamic data
    let riskColor = '#28a745'; // Default green for good
    let riskText = 'Good'; // Default text for good

    if (accuracy < 60) {
        riskColor = '#dc3545'; // Red for unhealthy
        riskText = 'Bad'; // Text for bad
    } else if (accuracy < 80) {
        riskColor = '#ffc107'; // Yellow for moderate
        riskText = 'Moderate'; // Text for moderate
    }

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URL
                style={styles.image}
            />
            <View style={styles.content}>
                <View style={styles.riskContainer}>
                    <View style={[styles.indicator, { backgroundColor: riskColor }]} />
                    <Text style={[styles.riskText, { color: riskColor }]}>{riskText}</Text>
                </View>
                <Text style={styles.title}>Accuracy: 90%</Text>
                <Text style={styles.description}>Description: Lorem</Text>
                <Text style={styles.muted}>Reason: lorem</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 40,
        overflow: 'hidden',
        margin: 10,
        backgroundColor: COLORS.backgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 30
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.darkGreen
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
        color: COLORS.darkGreen
    },
    muted: {
        fontSize: 16,
        color: '#666',
    },
    riskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    indicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    riskText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetailCard;
