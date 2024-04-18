import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import MealCard from '../../components/MealCard';
import { fetchMeals } from '../../api/FirestoreService';
import { calculateTotalCalories } from '../../api/NutritionDataParser';
import { useFocusEffect } from '@react-navigation/native';

const DiaryScreen = ({ navigation }) => {
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMeals = async () => {
    setLoading(true);
    const { success, meals, error } = await fetchMeals();
    if (success) {
      // Group by date
      const groupedMeals = meals.reduce((acc, meal) => {
        const date = meal.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(meal);
        return acc;
      }, {});

      // Sort each group by time
      for (const date in groupedMeals) {
        groupedMeals[date].sort((a, b) => {
          const timeA = new Date(`1970/01/01 ${a.startTime}`);
          const timeB = new Date(`1970/01/01 ${b.startTime}`);
          return timeA - timeB;
        });
      }

      // Convert the object into an array and sort by date
      const sortedDateEntries = Object.entries(groupedMeals).map(([date, meals]) => ({
        date,
        meals
      })).sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB - dateA;
      });

      setMealData(sortedDateEntries);
    } else {
      console.error('Failed to fetch meals:', error);
    }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMeals();
    }, [])
  );

  const onNewEntryPress = () => {
    navigation.navigate('FavoriteMeals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diary</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : mealData.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {mealData.map((dateEntry, index) => (
            <View key={index}>
              <Text style={styles.date}>{dateEntry.date}</Text>
              {dateEntry.meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  mealType={meal.mealType}
                  mealName={meal.mealName}
                  mealTime={`${meal.startTime} - ${meal.endTime}`}
                  calories={calculateTotalCalories(meal.foods)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No meals have been logged!</Text>
      )}
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
