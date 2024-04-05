import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InputField from '../../components/InputField'; // Adjust the path as needed

const FoodInputScreen = ({navigation}) => {
  const [food, setFood] = useState('');
  const [mealType, setMealType] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

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

  const handleAddFood = () => {
    // Logic to handle adding food
    navigation.navigate('SearchFood');
    console.log(`Food: ${food}, Meal: ${mealType}, Date: ${date.toISOString()}, Start Time: ${startTime.toISOString()}, End Time: ${endTime.toISOString()}`);
  };

  const handleCreateMeal = () => {
    // Logic to handle creating a meal
    console.log(`Creating a meal with: ${food}, Meal: ${mealType}`);
  };

  // Helper functions to format the date and time into readable strings
  const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  const formatTime = (time) => `${time.getHours() % 12}:${time.getMinutes().toString().padStart(2, '0')} ${time.getHours() >= 12 ? 'PM' : 'AM'}`;

  return (
    <SafeAreaView style={styles.container}>

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
        <TouchableOpacity style={styles.button} onPress={handleAddFood}>
          <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCreateMeal}>
          <Text style={styles.buttonText}>Create Meal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor:'white'
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
});

export default FoodInputScreen;
