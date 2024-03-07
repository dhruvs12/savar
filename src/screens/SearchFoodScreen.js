import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Switch} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/InputField';
import SearchFoodItem from '../components/SearchFoodItem';
import { searchFood, getFoodDataFromId } from '../api/FoodDataApi';

const categories = [
  { fdcId: '1', description: 'Vegetables', icon: 'carrot' },
  { fdcId: '2', description: 'Fruits', icon: 'apple' },
  { fdcId: '3', description: 'Proteins', icon: 'food-steak' },
  { fdcId: '4', description: 'Grains', icon: 'rice' },
  { fdcId: '5', description: 'Dairy', icon: 'cow' },
  { fdcId: '6', description: 'Snacks', icon: 'food' },
  { fdcId: '7', description: 'Beverages', icon: 'cup' },
];

const SearchFoodScreen = ({navigation}) => {

  // STATES
  const [searchQuery, setSearchQuery] = useState('');                 // Search Query State
  const [foods, setFoods] = useState(categories);                     // Food List State
  const [isGenericSearch, setIsGenericSearch] = useState(false);      // Generic State

  // Navigation Handler
  const goBack = () => {
    navigation.navigate('NewMeals');
  }

  // Search Handler
  // -> makes Food Data Central API call to get list of foods
  const handleSearch = async () => {
    if (searchQuery) {
      const results = await searchFood(searchQuery, isGenericSearch);
      setFoods(results);
    }
  };

  // Call handleSearch whenever selectedButton changes
  useEffect(() => {
    handleSearch();
  }, [isGenericSearch]);

  // Handle Food Selected
  const handlePress = async (fdcId) => {
    try {
      const foodData = await getFoodDataFromId(fdcId);
      console.log(fdcId);
      navigation.navigate('NutritionScreen', { foodData: foodData });
    } catch (error) {
      console.error('Failed to fetch food data:', error);
    }
  };

  // Common Branded Style handler
  const buttonStyle = (buttonType) => ({
    button: {
      backgroundColor: selectedButton === buttonType ? '#6200ee' : '#F8F8F8',
    },
    text: {
      color: selectedButton === buttonType ? 'white' : 'black',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#8E8E93" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <InputField 
            text="Search for foods..." 
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Generic Food</Text>
        <Switch
        trackColor={{ false: "#6200ee", true: "#6200ee"}}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) => setIsGenericSearch(value)}
        value={isGenericSearch}
        />
      </View>

      <FlatList
        data={foods}
        keyExtractor={item => item.fdcId.toString()}
        renderItem={({ item }) => (
        <SearchFoodItem
          fdcId={item.fdcId}
          description={item.description}
          brandName={item.brandName}
          onPress={handlePress}
        />
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
    // backgroundColor:'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 100,
    paddingVertical: 10,
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: '800', 
    color: '#6200ee',
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
