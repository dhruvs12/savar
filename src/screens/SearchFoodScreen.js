import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/InputField'; // Adjust the import path as necessary

const categories = [
  { id: '1', name: 'Vegetables', icon: 'carrot' },
  { id: '2', name: 'Fruits', icon: 'apple' },
  { id: '3', name: 'Proteins', icon: 'food-steak' },
  { id: '4', name: 'Grains', icon: 'rice' },
  { id: '5', name: 'Dairy', icon: 'cow' },
  { id: '6', name: 'Snacks', icon: 'food' },
  { id: '7', name: 'Beverages', icon: 'cup' },
];

const SearchFoodScreen = ({navigation}) => {

  const goBack = () => {
    navigation.navigate('NewMeals');
  }

  const handlePress = (itemName) => {

  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#8E8E93" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <InputField text="Search for foods..." />
        </View>
      </View>

     <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => handlePress(item.name)}>
            <MaterialCommunityIcons name={item.icon} size={20} color="#8E8E93" />
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => console.log('Remove', item.name)}>
              <MaterialCommunityIcons name="close" size={20} color="#8E8E93" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex:1,
    marginTop: 11,
    marginRight:8,
    justifyContent: 'center'
  },
  listItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f7',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
  },
  removeButton: {
    padding: 5,
  },
});

export default SearchFoodScreen;
