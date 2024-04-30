import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.heading}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.text}>{ingredient}</Text>
      ))}
      <Text style={styles.heading}>Instructions:</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ee',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#6200ee',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333', // Adjust text color as needed
  },
});

export default RecipeCard;
