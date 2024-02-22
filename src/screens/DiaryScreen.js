import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import MealCard from '../components/MealCard';

// Sample Data
const sampleData = [
  {
    date: '02/10/24',
    meals: [
      {
        id: 1,
        mealType: 'Breakfast',
        mealName: 'Oatmeal',
        mealTime: '8:00 AM',
        calories: 300,
      },
      {
        id: 2,
        mealType: 'Lunch',
        mealName: 'Fish',
        mealTime: '12:00 AM',
        calories: 1000,
      }
    ],
  },
  {
    date: '02/11/24',
    meals: [
      {
        id: 3,
        mealType: 'Lunch',
        mealName: 'Burger',
        mealTime: '12:00 AM',
        calories: 1300,
      },
      {
        id: 4,
        mealType: 'Dinner',
        mealName: 'Soup',
        mealTime: '5:00 AM',
        calories: 600,
      }
    ],
  }
];

const DiaryScreen = ({navigation}) => {

  const onNewEntryPress = () => {
    navigation.navigate('FavoriteMeals');
  }

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diary</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {sampleData.map((day) => (
          <View key={day.date}>
            <Text style={styles.date}>{day.date}</Text>
            {day.meals.map((meal) => (
              <MealCard
                key={meal.id}
                mealType={meal.mealType}
                mealName={meal.mealName}
                mealTime={meal.mealTime}
                calories={meal.calories}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.newEntryButton} onPress={onNewEntryPress}>
        <Text style={styles.newEntryButtonText}>New Entry</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    scrollView: {
      padding: 0,
    },
    date: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 5,
      marginTop: 20,
      paddingLeft: 15
    },
    newEntryButton: {
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      backgroundColor: '#6200ee',
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    newEntryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });

export default DiaryScreen;
