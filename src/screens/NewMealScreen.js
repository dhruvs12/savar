import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../components/InputField';

const NewMealScreen = ({navigation}) => {

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeStartTime = (event, selectedTime) => {
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const onChangeEndTime = (event, selectedTime) => {
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleAddFood = () => {
  
    console.log('Add Food Pressed with the following details:');
    console.log('Date:', date);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);

    
    navigation.navigate('SearchFood');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Meal</Text>
      </View>

      <View style={styles.inputContainer}>
        <InputField style={{width:'100%'}}text="New Meal" />
      </View>


      <View style={styles.dateTimeContainer}>

        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
        <View style={styles.timeContainer}>
        <View style={[styles.timeBlock, styles.startBlock]}>
          <Text style={styles.timeLabel}>Start Time</Text>
          <View style={styles.timePickerContainer}>
            <DateTimePicker
              style={{width:'200%'}}
              testID="startDateTimePicker"
              value={startTime}
              mode="time"
              is24Hour={true}
              onChange={onChangeStartTime}
            />
          </View>
        </View>

        <View style={[styles.timeBlock, styles.endBlock]}>
          <Text style={styles.timeLabel}>End Time</Text>

          <View style={styles.timePickerContainer}>
            <DateTimePicker
              style={styles.timePicker}
              testID="startDateTimePicker"
              value={endTime}
              mode="time"
              is24Hour={true}
              onChange={onChangeStartTime}
            />
          </View>
        </View>
      </View>
      </View>
      
      <View style={styles.mealTypeContainer}>
        <Text style={styles.mealTypeLabel}>Meal Type</Text>
        <InputField text="Meal Type" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleAddFood}>
          <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Create Recipe</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputContainer: {
    marginRight:16,
    marginLeft:16
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop:32,
    marginBottom: 8,
    // backgroundColor: 'yellow'
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:16
  },
  timeBlock: {
    flexDirection: 'column',
    padding: 16,
    borderRadius: 10,
    alignItems:'center',
    backgroundColor:'blue'
  },
  timePickerContainer: {
    backgroundColor:'red',
    alignItems:'stretch'
  },
  startBlock: {
    marginRight: 8,
  },
  endBlock: {
    marginLeft: 8,
  },
  timeLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30, 
    paddingVertical: 16,
    marginBottom: 16,
  },
  mealTypeLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  primaryButton: {
    backgroundColor: '#6200ee',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexGrow: 1,
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: '#34C759',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default NewMealScreen;
