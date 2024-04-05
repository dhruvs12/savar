import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NutritionLabel = ({ nutritionData }) => {

  const formatNutrientValue = (nutrient) => {
    if (nutrient && typeof nutrient === 'object') {
      const precision = nutrient.amount === nutritionData.calories.amount ? 0 : 2;
      return `${parseFloat(nutrient.amount).toFixed(precision)} ${nutrient.unit}`;
    }
    return nutrient || 'N/A';
  };

  const renderNutrient = (name, nutrient, isBold, isTabbed) => (
    <View style={[styles.nutrientRow, isTabbed && styles.tabbed]}>
      <Text style={[styles.nutrientName, isBold && styles.bold]}>{name}</Text>
      <Text style={[styles.nutrientAmount, isBold && styles.bold]}>{formatNutrientValue(nutrient)}</Text>
    </View>
  );

  console.log(nutritionData.saturatedFat);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nutrition Facts</Text>
      
      <View style={styles.divider} />
      
      <View style={[styles.nutrientRow]}>
        <Text style={[styles.calorieName]}>Calories</Text>
        <Text style={[styles.calorieAmount]}>{formatNutrientValue(nutritionData.calories)}</Text>
      </View>
      
      <View style={styles.divider} />
      {renderNutrient('Total Fat',(nutritionData.totalFat), true, false)}
      {renderNutrient('Saturated Fat',(nutritionData.saturatedFat), false, true)}
      {renderNutrient('Trans Fat', (nutritionData.transFat), false, true)}
      {renderNutrient('Cholesterol', (nutritionData.cholesterol), true)}
      {renderNutrient('Sodium', (nutritionData.sodium), true)}
      {renderNutrient('Total Carbohydrate', (nutritionData.totalCarbohydrate), true)}
      {renderNutrient('Dietary Fiber', (nutritionData.dietaryFiber), false, true)}
      {renderNutrient('Total Sugars', (nutritionData.totalSugar), false, true)}
      {renderNutrient('Includes Added Sugars', nutritionData.addedSugars, false, true)}
      {renderNutrient('Protein', nutritionData.protein, true)}
      <View style={styles.divider} />
      {renderNutrient('Vitamin D', nutritionData.vitaminD)}
      {renderNutrient('Calcium', nutritionData.calcium)}
      {renderNutrient('Iron', nutritionData.iron)}
      {renderNutrient('Potassium', nutritionData.potassium)}  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    fontWeight: '800',
    fontSize: 24,
    color: '#6200ee', // Purple tone for heading
    marginBottom: 6,
  },
  servingSize: {
    fontWeight: '600',
    fontSize: 16,
    color: '#6200ee', // Purple tone for serving size
    marginBottom: 6,
  },
  calories: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  calorieName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  calorieAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  nutrientName: {
    fontSize: 14,
    color: '#000',
  },
  nutrientAmount: {
    fontSize: 14,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  tabbed: {
    marginLeft: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#6200ee',
    marginVertical: 6,
  },
});

export default NutritionLabel;
