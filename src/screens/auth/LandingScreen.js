// src/screens/MealTrackerScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LandingScreen = ({navigation}) => {

  const handleStartTracking = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Savar</Text>
      </View>

      <View style={styles.card}>

        <View style={styles.imageContainer}>
          <Image source={require('../../assets/landing-food-image.png')} style={styles.image} />
        </View>

        <Text style={styles.title}>Sync your food and health</Text>

        <Text style={styles.description}>
          Keep track of your meals, view nutrition information, and correlate your food intake with your health data. Discover new meal ideas and
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleStartTracking}>
          <Text style={styles.buttonText}>Start tracking</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    headerContainer: {
        alignItems: 'center',
        marginVertical: 30,
        // backgroundColor: '#ADD8E6'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    card: {
        flex: 1,
        marginHorizontal: 20,
        borderRadius: 10,
        // backgroundColor: '#ADD8E6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#6200ee', // Replace with your button color
        padding: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Full width of the card
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default LandingScreen;
