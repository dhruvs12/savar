import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealCard = ({ mealType, mealName, mealTime, calories }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.mealType}>{mealType}</Text>
        <Text style={styles.mealName}>{mealName}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.mealTime}>{mealTime}</Text>
        {calories && <Text style={styles.calories}>{calories} kcal</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
    margin: 8,
  },
  cardHeader: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
  },
  mealType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  mealName: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealTime: {
    fontSize: 14,
    color: '#333333',
  },
  calories: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default MealCard;
