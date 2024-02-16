import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FavoriteMealCard from '../components/FavoriteMealCard';

const FavoriteMealsScreen = () => {
  // This function would handle the creation of a new meal entry
  const handleCreateNewMeal = () => {
    // Navigation or state update logic goes here
  };

  // Example data - replace this with your actual data fetching mechanism
  const mealOptions = [
    {
      id: 1,
      title: 'Strawberry Mango Smoothie',
      subtitle: 'Breakfast',
      actionText: 'Add',
      iconName: 'silverware-fork-knife',
    },
    {
      id: 2,
      title: "Mom's Chicken Curry",
      subtitle: 'Dinner',
      actionText: 'Add',
      iconName: 'food-apple',
    },
    // Add more meal options here...
  ];

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Meals</Text>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.scrollView}>
        {mealOptions.map((meal) => (
          <FavoriteMealCard
            key={meal.id}
            title={meal.title}
            subtitle={meal.subtitle}
            actionText={meal.actionText}
            iconName={meal.iconName}
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
