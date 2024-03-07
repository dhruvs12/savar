// FoodItem.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchFoodItem = ({ fdcId, description, brandName, onPress }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => onPress(fdcId)}>
      <MaterialCommunityIcons name="food" size={20} color="#8E8E93" />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{description}</Text>
        {brandName && <Text style={styles.brandName}>{brandName}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f7',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    // Adjust styles if needed
  },
  brandName: {
    // Style for the brand name, e.g., a different color or font weight
    fontWeight: 'bold',
    color: '#8E8E93',
  },
});

export default SearchFoodItem;
