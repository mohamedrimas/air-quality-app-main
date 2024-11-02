import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';

const OptimalTimeResultCard = ({ result }) => {
    console.log("OptimalTimeResultCard");
    console.log(result);


    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.topTitle}>Result</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Co2 Level: {result?.co2Level.toFixed(3)}</Text>
                <Text style={styles.description}>Date: {result?.day}</Text>
                <Text style={styles.muted}>Hour: {result?.hour}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.darkGreen
    },
    topTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 10,
        color: COLORS.darkGreen
    },
    description: {
        fontSize: 20,
        marginBottom: 5,
        color: COLORS.darkGreen
    },
    muted: {
        fontSize: 20,
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

export default OptimalTimeResultCard;
