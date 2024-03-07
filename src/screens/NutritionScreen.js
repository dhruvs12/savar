import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import NutritionLabel from '../components/NutritionLabel';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { parse_data_food_portions, parse_data_serving_size, parse_data_standard_serving} from '../api/NutritionDataParser';

const NutritionScreen = ({ route }) => {

  const { foodData } = route.params;

  let coreNutritionArr = parse_data_food_portions(foodData);
  if (!coreNutritionArr || coreNutritionArr.length === 0) {
    let coreNutritionData = parse_data_serving_size(foodData);
    if (!coreNutritionData) {
      coreNutritionData = parse_data_standard_serving(foodData);
    }
    coreNutritionArr = [coreNutritionData];
  }
  
  const [selectedPortionIndex, setSelectedPortionIndex] = useState(0);
  const [coreNutrition, setCoreNutrition] = useState(coreNutritionArr && coreNutritionArr.length > 0 ? coreNutritionArr[0] : {});

  // ModalSelector reference
  let modalSelectorRef = null;

  // Generate picker data
  const pickerData = coreNutritionArr?.map((item, index) => ({
    key: index.toString(),
    label: `${item.portionDescription} (${item.gramWeight}g)`,
  })) || [];

  const handlePickerSelect = (option) => {
    const index = parseInt(option.key, 10);
    const selectedOption = coreNutritionArr[index];
    if (selectedOption) {
      setSelectedPortionIndex(index);
      setCoreNutrition(selectedOption);
    }
  };

  // BUTTON HANDLERS
  const handleAddFood = () => {
    console.log('Adding food...');
  };

  const handleSeeFullNutrients = () => {
    console.log('Viewing full nutrient list...');
  };

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      
      <Text style={styles.title}>{foodData.description}</Text>

      <NutritionLabel nutritionData={coreNutrition} />

      {coreNutritionArr && coreNutritionArr.length > 0 && (
    <View style={styles.selectorContainer}>

      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => modalSelectorRef.open()} // Use the ref to open the ModalSelector
      >
        {/* Update this part to use coreNutrition for displaying selected portion details */}
        <Text style={styles.selectorText}>{`${coreNutrition.portionDescription} (${coreNutrition.gramWeight}g)`}</Text>
        <Icon name="chevron-down" size={24} color="#6200ee" />
      </TouchableOpacity>

      <ModalSelector
        data={pickerData}
        ref={selector => { modalSelectorRef = selector; }}
        initValue={`${coreNutrition.portionDescription} (${coreNutrition.gramWeight}g)`}
        onChange={(option) => handlePickerSelect(option)}
        touchableStyle={{...styles.touchableStyle, opacity: 0}}
        optionContainerStyle={styles.optionContainerStyle}
        optionTextStyle={styles.optionTextStyle}
        sectionTextStyle={styles.sectionTextStyle}
        cancelContainerStyle={styles.cancelContainerStyle}
        cancelTextStyle={styles.cancelTextStyle}
        overlayStyle={styles.overlayStyle}
      />
      
    </View>
  )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
          <Text style={styles.buttonText}>Add Food</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fullNutrientButton} onPress={handleSeeFullNutrients}>
          <Text style={styles.fullButtonText}>See Full Nutrient List</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16
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
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'white', 
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    marginRight:16,
    marginLeft:16,
  },
  fullNutrientButton: {
    alignItems: 'center',
    marginBottom: 10
  },
  fullButtonText: {
    color: '#6200ee',
    fontSize: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  touchableStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#6200ee',
    // ... other styles ...
  },
  optionContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 25, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionTextStyle: {
    textAlign: 'center',
    color: '#6200ee', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  sectionTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: '#000',
    backgroundColor: '#efefef', 
  },
  cancelContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 25, 
    padding: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelTextStyle: {
    fontSize: 18,
    color: '#6200ee', 
  },
  overlayStyle: {
    flex: 1,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  selectorText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  iconStyle: {
    padding: 10, 
    color: '#6200ee', 
  },
});

export default NutritionScreen;
