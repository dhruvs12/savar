import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import NutritionLabel from '../components/NutritionLabel';

import { getFullNutrientMap, getCoreNutritionData } from '../api/NutritionDataParser';

const NutritionScreen = ({foodData}) => {

  const allNutrientsList = getFullNutrientMap(foodData.foodNutrients);
  const coreNutrition = getCoreNutritionData(allNutrientsList);

  // State to manage selected serving
  const [selectedServing, setSelectedServing] = useState(foodData.foodPortions.modifier);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        
        <Text style={styles.title}>{foodData.description}</Text>

        <NutritionLabel nutritionData={coreNutrition} />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555', // Slightly lighter than title
    marginTop: 20,
    marginBottom: 10,
  },
  nutritionInfo: {
    backgroundColor: '#fff', // White background for the card
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666', // Gray text for information
    marginBottom: 5,
  },
  servingSizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  servingButton: {
    backgroundColor: '#e0e0e0', // Light gray for buttons
    padding: 10,
    borderRadius: 20, // Rounded corners for buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android
  },
  selectedServing: {
    backgroundColor: '#4CAF50', // Highlight selected serving
  },
  servingText: {
    fontSize: 16,
    color: '#333', // Dark text for readability
  },
  addButton: {
    backgroundColor: '#4CAF50', // Consistent color for the add button
    padding: 15,
    borderRadius: 20, // Rounded corners for the button
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // For Android
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff', // White text for contrast
    fontWeight: 'bold',
  },
});

export default NutritionScreen;
