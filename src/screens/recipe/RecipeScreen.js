import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Linking, FlatList, Image, TouchableOpacity, SafeAreaView, Modal, ScrollView, ActivityIndicator} from 'react-native';
import InputField from '../../components/InputField';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeCard from '../../components/RecipeCard';
import Swiper from 'react-native-swiper';
import { fetchRecipes, fetchRecipesFromDiaryEntries} from '../../api/DiscoverRecipeService';

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeCards, setRecipeCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const initializeRecipes = async () => {
      const recipes = await fetchRecipesFromDiaryEntries();
      if (recipes) {
        setRecipeCards(recipes);
      }
    };

    initializeRecipes();
  }, []);

  const handleSearch = async () => {
    if (searchQuery !== '') {
      const foundRecipes = await fetchRecipes(searchQuery);
      setRecipes(foundRecipes);
    }
  };

  const krabbyPattyRecipe = {
    title: "Krabby Patty",
    ingredients: [
        "1 Krabby Patty bun",
        "1 Krabby Patty patty",
        "1 slice cheddar cheese",
        "2 slices tomato",
        "Lettuce leaves",
        "Pickles",
        "1/4 cup secret sauce",
        "1/4 cup chopped onions",
        "1/4 cup shredded lettuce",
        "1/4 cup chopped tomatoes",
        "1/4 cup chopped pickles",
        "1/4 cup mustard",
        "1/4 cup ketchup",
        "Salt and pepper to taste"
    ],
    instructions: "1. Cook the Krabby Patty patty until it's well-done.\n2. Toast the Krabby Patty bun until golden brown.\n3. Place the cooked patty on the bottom half of the bun.\n4. Layer with cheddar cheese, tomato slices, lettuce leaves, and pickles.\n5. In a small bowl, mix secret sauce, chopped onions, shredded lettuce, chopped tomatoes, chopped pickles, mustard, ketchup, salt, and pepper.\n6. Spread the sauce mixture on the top half of the bun.\n7. Close the burger and serve hot."
};

  const viewRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Recipes!</Text>
        <View style={styles.inputContainer}>
          <InputField
            style={styles.searchInput}
            text="Search for a recipe"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <MaterialCommunityIcons name="magnify" size={24} color="#8b8b8b" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {recipes.length != 0 ? (
        <FlatList
          data={recipes}
          renderItem={({ item }) => {
            return item.recipe && item.recipe.image ? (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => viewRecipeDetails(item.recipe)}
              >
                <Image
                  source={{ uri: item.recipe.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryLabel}>{item.recipe.label}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.categoryCard}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        keyExtractor={(item, index) =>
          item.recipe ? item.recipe.uri : item.key
        }
        />
      ) : (
        <Swiper 
          style={styles.wrapper} 
          showsPagination={false}
          loop={false}>
          {recipeCards.length === 0 ? ( 
            <View style={styles.slide}>
              <ActivityIndicator size="large" color="#6200ee" />
              <ScrollView>
                <RecipeCard recipe={krabbyPattyRecipe} />
              </ScrollView>
            </View>
            ) : (
              recipeCards.map((recipe, index) => (
                <View key={index} style={styles.slide}>
                  <ScrollView>
                    <RecipeCard recipe={recipe} />
                  </ScrollView>
                </View>
              ))
            )}
        </Swiper>
      )}

      {selectedRecipe && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalTitle}>{selectedRecipe.label}</Text>
            <Image
              source={{ uri: selectedRecipe.image }}
              style={styles.modalImage}
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => Linking.openURL(selectedRecipe.url)}
            >
              <Text style={styles.modalButtonText}>View Full Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )}
      
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
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    width: '100%',
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
    marginBottom: 5
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  categoryImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  categoryLabel: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 10,
    marginTop: '20%',
    marginBottom: '20%'
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333'
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10
  },
  modalIngredientsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 15,
    color: '#333333'
  },
  modalIngredientText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    textAlign: 'left',
    width: '100%'
  },
  modalButton: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 25,
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  modalButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});

export default RecipeScreen;
