import React from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const GasConcentrationScreen = () => {
  const { co2Levels, timeStamps } = data;

  // Get unique dates from the timestamps
  const uniqueDates = [...new Set(timeStamps.map(ts => ts.split('T')[0]))];
  
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']; // Colors for different charts

  return (
    <ScrollView>
      {uniqueDates.map((date, dateIndex) => {
        // Filter data for the current date
        const dayData = co2Levels.filter((_, idx) => timeStamps[idx].startsWith(date));
        
        return (
          <View key={date} style={{ marginBottom: 24 }}>
            <Text style={{ textAlign: 'center', marginBottom: 8 }}>{date}</Text>
            <ScrollView horizontal>
              <LineChart
                data={{
                  labels: Array.from({ length: 24 }, (_, i) => i.toString()), // X-axis labels (0 to 23)
                  datasets: [
                    {
                      data: dayData,
                      color: () => colors[dateIndex % colors.length], // Color for the current day
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={Dimensions.get('window').width * 2} // Make the chart wider for better readability
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </ScrollView>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default GasConcentrationScreen;
