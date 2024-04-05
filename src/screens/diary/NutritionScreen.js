import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import NutritionLabel from '../../components/NutritionLabel';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getCoreNutritionData,
  getFullNutrientMap,
  getPortions,
  getRatioFullNutrientMap
} from '../../api/NutritionDataParser';

const NutritionScreen = ({ route }) => {
  const { foodData } = route.params;

  // Standard Size Full Nutrient Map
  const standardSizeFullNutrientMap = getFullNutrientMap(foodData.foodNutrients);

  // STATES
  const [portions, setPortions] = useState(getPortions(foodData));
  const [nutrientMap, setNutrientMap] = useState(getRatioFullNutrientMap(standardSizeFullNutrientMap, portions[0].amount));
  const [coreNutrition, setCoreNutrition] = useState({});
  const [pickerData, setPickerData] = useState([]);
  const [selectedPortion, setSelectedPortion] = useState({});
  const [showCustomGramInput, setShowCustomGramInput] = useState(false);
  const [customGramWeight, setCustomGramWeight] = useState('');

  // ModalSelector reference
  let modalSelectorRef = null;

  // Initialize Picker Data
  useEffect(() => {
    const initialPickerData = portions.map((portion, index) => ({
      key: index.toString(),
      label: `${portion.description} (${portion.amount}${portion.unit})`,
    }));
    initialPickerData.push({
      key: 'custom-input',
      label: 'Enter custom amount',
    });
    setPickerData(initialPickerData);
    setSelectedPortion(initialPickerData[0]);
  }, [foodData]);

  // BUTTON HANDLERS

  // Picker Select
  const handlePickerSelect = (option) => {
    if (option.key == 'custom-input') {
      setShowCustomGramInput(true);
    } else {
      const index = parseInt(option.key, 10);
      const selectedOption = pickerData[index];
      setNutrientMap(getRatioFullNutrientMap(standardSizeFullNutrientMap, portions[index].amount));
      setCoreNutrition(getCoreNutritionData(nutrientMap));
      setSelectedPortion(selectedOption);
      setShowCustomGramInput(false);
      setCustomGramWeight('');
    }
  };

  useEffect(() => {
    if (Object.keys(nutrientMap).length > 0) {
        const newCoreNutrition = getCoreNutritionData(nutrientMap);
        setCoreNutrition(newCoreNutrition);
    }
  }, [nutrientMap]);

  const handleCustomGramWeightSubmit = () => {
    const customWeight = parseFloat(customGramWeight) || 0;
    if (customWeight > 0) {
      const customLabel = `Custom`;
      
      const customPortion = {
        description: customLabel,
        amount: customWeight,
        unit: portions[0].unit,
      };

      const updatedPortions = [...portions];
      updatedPortions.push(customPortion);

      setPortions(updatedPortions);

      const customPortionPicker = {
        key: (pickerData.length - 1).toString(),
        label: `${customPortion.description} (${customPortion.amount}${customPortion.unit})`,
      }

      const updatedPickerData = [...pickerData];
      updatedPickerData.splice(updatedPickerData.length-1, 0, customPortionPicker);
  
      setPickerData(updatedPickerData);
  
      setSelectedPortion(customPortionPicker);
      setNutrientMap(getRatioFullNutrientMap(standardSizeFullNutrientMap, customWeight));
      setCoreNutrition(getCoreNutritionData(nutrientMap));
  
      setShowCustomGramInput(false);
      setCustomGramWeight('');
    }
  };
  

  // Full Nutrients List
  const handleSeeFullNutrients = () => {
    setModalVisible(true);
  };

  // Add Food
  const handleAddFood = () => {
    console.log('Adding food...');
  };

  return (
    <SafeAreaView style={{backgroundColor:'white', flex: 1}}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        
        <Text style={styles.title}>{foodData.description}</Text>
        
        <NutritionLabel nutritionData={coreNutrition} />

        <View style={styles.selectorContainer}>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => modalSelectorRef.open()}
            >
              <Text style={styles.selectorText}>{selectedPortion.label}</Text>
              <Icon name="chevron-down" size={24} color="#6200ee" />
            </TouchableOpacity>

            <ModalSelector
              data={pickerData}
              ref={selector => { modalSelectorRef = selector; }}
              initValue={selectedPortion ? selectedPortion.label : 'Select a serving size'}
              onChange={handlePickerSelect}
              touchableStyle={{...styles.touchableStyle, opacity: 0}}
              optionContainerStyle={styles.optionContainerStyle}
              optionTextStyle={styles.optionTextStyle}
              sectionTextStyle={styles.sectionTextStyle}
              cancelContainerStyle={styles.cancelContainerStyle}
              cancelTextStyle={styles.cancelTextStyle}
              overlayStyle={styles.overlayStyle}
            />
        </View>

        {showCustomGramInput && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Enter custom amount"
              keyboardType="numeric"
              onChangeText={setCustomGramWeight}
              value={customGramWeight}
            />
            <TouchableOpacity
              style={styles.customInputButton}
              onPress={handleCustomGramWeightSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}


        <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
            <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fullNutrientButton} onPress={handleSeeFullNutrients}>
            <Text style={styles.fullButtonText}>See Full Nutrient List</Text>
        </TouchableOpacity>

      </ScrollView>
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
  customInputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  customInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  customInputButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nutrientText: {
    textAlign: 'center',
    // ... other styles you may want for the nutrient text ...
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default NutritionScreen;
