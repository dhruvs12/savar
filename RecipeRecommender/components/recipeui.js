import React from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const categories = [
  { key: 'salads', label: 'Healthy Salads', image: require('./assets/salad.jpg') },
  { key: 'quick', label: 'Quick and Easy', image: require('./assets/quick.jpg') },
  { key: 'flavors', label: 'International Flavors', image: require('./assets/flavors.jpg') },
  { key: 'treats', label: 'Decadent Treats', image: require('./assets/treats.jpg') },
];

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover new recipes</Text>
        <Icon name="search" size={24} color="#000" />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a recipe"
      />
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.bottomNav}>
        <Icon name="home" size={24} />
        <Icon name="search" size={24} />
        <Icon name="wallet" size={24} />
        <Icon name="user" size={24} />
      </View>
    </View>
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

export default App;
