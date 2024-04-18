import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InputField from '../../components/InputField'; // Adjust the path as needed
import SwipeableFoodItem from '../../components/SwipeableFoodItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { addMeal } from '../../api/FirestoreService';


const NewMealScreen = ({ navigation, route }) => {

  // STATES

  // Mean Input
  const [food, setFood] = useState('');
  const [mealType, setMealType] = useState('');

  // Date Time Input
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Food Array
  const [addedFoods, setAddedFoods] = useState([]);

  useEffect(() => {
    if (route.params && route.params.foodToAdd) {
      const foodToAdd = route.params.foodToAdd;
      const newFoodItem = {
        name: foodToAdd.name, 
        amount: foodToAdd.amount,
        unit: foodToAdd.unit,
        nutrientMap: foodToAdd.nutrientMap,
      }; 
      setAddedFoods(prevFoods => [...prevFoods, newFoodItem]);
    }
  }, [route.params]);

  // BUTTON AND PICKER HANDLERS

  // Date and Time Picker Handlers
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hidePicker = () => {
    setDatePickerVisibility(false);
    setStartTimePickerVisibility(false);
    setEndTimePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    hidePicker();
  };

  const handleConfirmStartTime = (selectedTime) => {
    const currentTime = selectedTime || startTime;
    setStartTime(currentTime);
    hidePicker();
  };

  const handleConfirmEndTime = (selectedTime) => {
    const currentTime = selectedTime || endTime;
    setEndTime(currentTime);
    hidePicker();
  };

  // Button Handlers

  const handleAddFood = () => {
    // Logic to handle adding food
    navigation.navigate('SearchFood');
  };

  const handleCreateMeal = async () => {

    if (!food.trim()) {
      alert('Please enter a meal name.');
      return;
    }
    if (startTime >= endTime) { 
      alert('Start time is greater than or equal to end time');
      return;
    }
    if (addedFoods.length === 0) {
      alert('Please add at least one food item.');
      return;
    }

    // Logic to handle creating a meal
    const mealData = {
      mealName: food,
      mealType: mealType,
      date: formatDate(date), 
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      foods: addedFoods 
    };

    
    const { success, id, error } = await addMeal(mealData);
    if (success) {
      console.log('Meal created with ID:', id);
      alert('Meal created successfully!');
      navigation.navigate('Diary');
    } else {
      console.error('Failed to create meal:', error);
      alert('Failed to create meal. Our team has been alerted');
    }

  };

  // Scrollview Handler

  const handleDeleteFood = (index) => {
    const updatedFoods = [...addedFoods];
    updatedFoods.splice(index, 1);
    setAddedFoods(updatedFoods);
  };

  // Helper functions to format the date and time into readable strings
  const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  const formatTime = (time) => `${time.getHours() % 12}:${time.getMinutes().toString().padStart(2, '0')} ${time.getHours() >= 12 ? 'PM' : 'AM'}`;

  const renderFoodItem = (foodItem, index) => {
    return (
      <SwipeableFoodItem
        key={index}
        foodItem={foodItem}
        onDelete={() => handleDeleteFood(index)}
      />
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{food || "Enter Meal Name"}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            color={isFavorite ? "red" : "grey"}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <InputField
          text="Enter food name"
          onChangeText={setFood}
          value={food}
        />
        <InputField
          text="Meal Type (e.g. Breakfast, Lunch, Dinner)"
          onChangeText={setMealType}
          value={mealType}
        />
      </View>

      <View style={styles.timeSection}>
        <TouchableOpacity style={styles.dateTimeButton} onPress={showDatePicker}>
          <Text style={styles.dateTimeButtonText}>Date: {formatDate(date)}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hidePicker}
        />

        <TouchableOpacity style={styles.dateTimeButton} onPress={showStartTimePicker}>
          <Text style={styles.dateTimeButtonText}>Start Time: {formatTime(startTime)}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmStartTime}
          onCancel={hidePicker}
        />

        <TouchableOpacity style={styles.dateTimeButton} onPress={showEndTimePicker}>
          <Text style={styles.dateTimeButtonText}>End Time: {formatTime(endTime)}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmEndTime}
          onCancel={hidePicker}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleAddFood}>
          <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCreateMeal}>
          <Text style={styles.buttonText}>Create Meal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.addedFoodsContainer}
        contentContainerStyle={styles.addedFoodsContentContainer}
      >
        {addedFoods.length > 0 ? (
          addedFoods.map((foodItem, index) => (
            renderFoodItem(foodItem, index) // Use the renderFoodItem function here
          ))
        ) : (
          <Text style={styles.placeholderText}>Click Add Food to Search for some foods!</Text>
        )}
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,  // Allows the text to expand and use available space, pushing the icon to the right
  },
  favoriteButton: {
    padding: 10,
  },
  inputSection: {
    width: '100%',
    padding: 20
    // marginBottom: 20,
  },
  timeSection: {
    width: '100%',
    padding: 20
    // marginBottom: 20,
  },
  dateTimeButton: {
    backgroundColor: '#e7e7e7', // a light grey, distinct from the input field
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  dateTimeButtonText: {
    color: '#333', // dark grey or black for better contrast
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexGrow: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  addedFoodsContainer: {
    flex: 1,
    paddingHorizontal: 10, // Add some horizontal padding
    paddingVertical: 20, // Add padding to the top of the list
    width: '100%'
  },
  addedFoodsContentContainer: {
    paddingBottom: 20, // Space at the bottom of the scroll view
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e7e7e7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  foodName: {
    fontSize: 16,
    color: '#333',
  },
  foodGramWeight: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa', // grey color for placeholder
    textAlign: 'center',
    marginTop: 20,
  },
  
});

export default NewMealScreen;
