import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import NutrientIntakeGraph from '../../components/NutrientIntakeGraph';

const NutrientIntakeScreen = () => {

  const nutrientIntakeData = [
    { day: 'Mon', protein: 80, carbohydrates: 150, sugar: 20, transFat: 5 },
    { day: 'Tue', protein: 90, carbohydrates: 140, sugar: 25, transFat: 7 },
    { day: 'Wed', protein: 85, carbohydrates: 160, sugar: 22, transFat: 6 },
    { day: 'Thu', protein: 95, carbohydrates: 155, sugar: 28, transFat: 8 },
    { day: 'Fri', protein: 100, carbohydrates: 150, sugar: 30, transFat: 10 },
    { day: 'Sat', protein: 110, carbohydrates: 145, sugar: 35, transFat: 12 },
    { day: 'Sun', protein: 120, carbohydrates: 140, sugar: 40, transFat: 15 },
  ];

  const goToInsights = () => {
    navigation.navigate('InsightsScreen');
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerTitle}>Nutrient Intake</Text>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Carbohydrates Intake</Text>
          <NutrientIntakeGraph
            data={nutrientIntakeData.map(day => day.carbohydrates)}
          />
        </View>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Protein Intake</Text>
          <NutrientIntakeGraph
            data={nutrientIntakeData.map(day => day.protein)}
          />
        </View>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Sugar Intake</Text>
          <NutrientIntakeGraph
            data={nutrientIntakeData.map(day => day.sugar)}
          />
        </View>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Trans Fat Intake</Text>
          <NutrientIntakeGraph
            data={nutrientIntakeData.map(day => day.transFat)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={goToInsights}>
        <Text style={styles.floatingButtonText}>View Insights</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 25, 
  },
  graphContainer: {
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left', 
    marginTop: 10,
    color: '#6200EE', 
    width: '100%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default NutrientIntakeScreen;

