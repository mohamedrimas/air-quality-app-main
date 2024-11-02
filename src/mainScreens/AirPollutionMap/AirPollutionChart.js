import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function AirPollutionChart({ data }) {
    const screenWidth = Dimensions.get('window').width;

    const chartData = {
        labels: ['CO2', 'NO2', 'CH4'],
        datasets: [
            {
                data: [data?.averageCO2Level, data?.averageNO2Level, data?.averageCH4Level],
            },
        ],
    };

    return (
        <View>
            <BarChart
                style={{ marginVertical: 10 }}
                data={chartData}
                width={screenWidth - 40}
                height={220}
                yAxisLabel=""
                yAxisSuffix="ppm"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        paddingLeft: 40, // Increase padding for Y-axis label visibility
                    },
                }}
                verticalLabelRotation={30}
                yLabelsOffset={15} // Offset Y-axis labels for better visibility
            />

            <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 14 }}>
                Last updated: {new Date(data?.timestamp).toLocaleString()}
            </Text>
        </View>
    );
}
