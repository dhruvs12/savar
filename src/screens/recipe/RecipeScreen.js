import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppleHealthKit from 'react-native-health';
import Axios from 'axios';

const healthKitOptions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.DietaryEnergyConsumed],
    write: []
  },
};

const APP_ID = "89467cf5";
const APP_KEY = "3e6786aaf09b0d7c07ec39a962ab08e5";

const categories = [
  { key: 'salads', label: 'Healthy Salads', image: require('../../assets/salad.jpg') },
  { key: 'quick', label: 'Quick and Easy', image: require('../../assets/quick.jpg') },
  { key: 'flavors', label: 'International Flavors', image: require('../../assets/flavors.jpg') },
  { key: 'treats', label: 'Decadent Treats', image: require('../../assets/treats.jpg') },
];

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    AppleHealthKit.initHealthKit(healthKitOptions, (error) => {
      if (error) {
        console.error("Error initializing Health kit: ", error);
        return;
      }
      fetchNutritionalData();
    });
  }, []);

  const fetchNutritionalData = () => {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); // Fetch data from the last month
    const options = {
      startDate: startDate.toISOString(),
      endDate: (new Date()).toISOString(),
    };

    AppleHealthKit.getDailyDietaryEnergySamples(options, (err, results) => {
      if (err) {
        console.error("Error fetching Dietary Energy Samples: ", err);
        return;
      }
      // Assume the first result is the latest one
      const lastEntry = results[0];
      const calories = lastEntry ? lastEntry.value : 2000; // Default to 2000 calories if no data
      fetchRecipes(calories < 1800 ? 'low calorie' : 'high protein'); // Simplified logic
    });
  };

  const fetchRecipes = async (nutritionNeeds) => {
    try {
      const response = await Axios.get(`https://api.edamam.com/search?q=${nutritionNeeds}&app_id=${APP_ID}&app_key=${APP_KEY}&to=10`);
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = () => {
    fetchRecipes(searchQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover new recipes</Text>
        <Icon name="search" size={24} color="#000" onPress={handleSearch} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a recipe"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={recipes.length > 0 ? recipes : categories}
        renderItem={({ item }) => item.recipe ? (
          <TouchableOpacity style={styles.categoryCard} onPress={() => Alert.alert(item.recipe.label)}>
            <Image source={{ uri: item.recipe.image }} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{item.recipe.label}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item, index) => item.recipe ? item.recipe.uri : item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#ccc',
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
});

export default RecipeScreen;