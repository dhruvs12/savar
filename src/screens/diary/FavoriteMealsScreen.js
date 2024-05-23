import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FavoriteMealCard from '../../components/FavoriteMealCard';
import { getFavoriteMeals } from '../../api/FirestoreService';
const FavoriteMealsScreen = ({navigation}) => {

  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    // Fetch favorite meals when the component mounts
    fetchFavoriteMeals();
  }, []);

  const fetchFavoriteMeals = async () => {
    try {
      const meals = await getFavoriteMeals();
      setFavoriteMeals(meals);
    } catch (error) {
      console.error('Error fetching favorite meals:', error);
    }
  };
  
  const handleCreateNewMeal = () => {
    navigation.navigate('NewMeals');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Meals</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {favoriteMeals.map((meal) => (
          <FavoriteMealCard
            key={meal.id}
            title={meal.mealName}
            subtitle={meal.mealType}
            actionText={"Add"}
            iconName={'silverware-fork-knife'}
            onActionPress={() => {
              // Define what happens when you press a meal card
            }}
          />
        ))}
      </ScrollView>

      {/* Create Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateNewMeal}>
        <Text style={styles.createButtonText}>Create</Text>
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
    padding: 16,
  },
  createButton: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoriteMealsScreen;
