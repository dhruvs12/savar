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
      const groupedByDate = meals.reduce((groupedMeals, meal) => {
        const formattedDate = meal.date.toDate().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
        if (!groupedMeals[formattedDate]) groupedMeals[formattedDate] = [];
        groupedMeals[formattedDate].push(meal);
        return groupedMeals;
      }, {});
  
      for (const date in groupedByDate) {
        groupedByDate[date].sort((mealA, mealB) => mealB.startTime.toDate() - mealA.startTime.toDate());
      }

      const parseDate = (dateString) => {
        const [month, day, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
      };      
  
      const sortedDateEntries = Object.entries(groupedByDate)
        .map(([date, meals]) => ({ date, meals }))
        .sort((a, b) => parseDate(b.date) - parseDate(a.date));
      
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
                  mealTime={`${meal.startTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${meal.endTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  calories={calculateTotalCalories(meal.foods)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noMealsContainer}>
          <Text style={styles.noMealsText}>No meals have been logged!</Text>
        </View>
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
  },
  noMealsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center'
  },
  noMealsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryScreen;
