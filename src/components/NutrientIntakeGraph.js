import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';

const NutrientIntakeGraph = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track active index
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 }); // State to track tooltip position

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    fillShadowGradient: '#6200ee',
    fillShadowGradientOpacity: 0.5,
    withInnerLines: false,
    withOuterLines: false,
    withVerticalLines: false,
    withHorizontalLines: false,
  };

  const handleDataPointClick = (dataPoint, dataset, index) => {
    // Adjust tooltip position
    const x = dataPoint.x;
    const y = dataPoint.y;
    setTooltipPos({ x, y });
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data }],
        }}
        width={350}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        onDataPointClick={handleDataPointClick}
        decorator={() => {
          return activeIndex !== null ? (
            <View style={{
              position: 'absolute',
              left: tooltipPos.x - 35, // Adjust based on your tooltip width
              top: tooltipPos.y - 40, // Adjust based on your tooltip height
              ...styles.tooltip
            }}>
              <Text style={styles.tooltipText}>Date: {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][activeIndex]}</Text>
              <Text style={styles.tooltipText}>Value: {data[activeIndex]}</Text>
            </View>
          ) : null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  tooltipText: {
    fontSize: 14,
    color: '#6200ee'
  }
});

export default NutrientIntakeGraph;
