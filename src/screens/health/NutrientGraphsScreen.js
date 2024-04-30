import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import NutrientIntakeGraph from '../../components/NutrientIntakeGraph';
import { getNutrientTotalsByDayPastWeek } from '../../api/FirestoreService';

const NutrientIntakeScreen = ({navigation}) => {

  const [nutrientIntakeData, setNutrientIntakeData] = useState([]);
  
  const generateLabelsForWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const days = [];
  
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      days.push(daysOfWeek[day.getDay()]);
    }
  
    return days;
  };

  useEffect(() => {
    const fetchNutrientData = async () => {
      try {
        const nutrientTotals = await getNutrientTotalsByDayPastWeek();
        setNutrientIntakeData(nutrientTotals);
      } catch (error) {
      }
    };
  
    fetchNutrientData();
  }, []);

  const mapNutrientDataToGraph = (primaryNutrientId, secondaryNutrientId) => {
    return nutrientIntakeData.map(day => {
      const primaryAmount = day[primaryNutrientId] || 0;
      const secondaryAmount = secondaryNutrientId ? (day[secondaryNutrientId] || 0) : 0;
      return primaryAmount + secondaryAmount;
    });
  };

  const nutrientGraphs = nutrientIntakeData.length > 0
  ? [
      { primaryId: 'CALORIES', secondaryId: 'CALORIES_ATWATER', title: 'Calories Intake' },
      { primaryId: 'TOTAL_CARB', title: 'Carbohydrates Intake' },
      { primaryId: 'DIETARY_FIBER', title: 'Dietary Fiber Intake' },
      { primaryId: 'TOTAL_SUGAR', secondaryId: 'TOTAL_SUGAR_NLEA', title: 'Total Sugar Intake' },
      { primaryId: 'ADDED_SUGAR', title: 'Added Sugar Intake' },
      { primaryId: 'TOTAL_FAT', secondaryId: 'TOTAL_FAT_NLEA', title: 'Total Fat Intake' },
      { primaryId: 'SATURATED_FAT', title: 'Saturated Fat Intake' },
      { primaryId: 'TRANS_FAT', title: 'Trans Fat Intake' },
      { primaryId: 'PROTEIN', title: 'Protein Intake' },
      { primaryId: 'CHOLESTEROL', title: 'Cholesterol Intake' },
      { primaryId: 'SODIUM', title: 'Sodium Intake' },
      { primaryId: 'VITAMIN_D', title: 'Vitamin D Intake' },
      { primaryId: 'CALCIUM', title: 'Calcium Intake' },
      { primaryId: 'IRON', title: 'Iron Intake' },
      { primaryId: 'POTASSIUM', title: 'Potassium Intake' },
      // ...other nutrients
    ].map(({ primaryId, secondaryId, title }) => (
      <View key={primaryId} style={styles.graphContainer}>
        <Text style={styles.graphTitle}>{title}</Text>
        <NutrientIntakeGraph
          labels={generateLabelsForWeek()}
          datasets={[{ data: mapNutrientDataToGraph(primaryId, secondaryId) }]}
        />
      </View>
    ))
  : null;

  const goToInsights = () => {
    navigation.navigate('InsightsScreen');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nutrient Intake</Text>
      </View>

      {nutrientGraphs ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {nutrientGraphs}
        </ScrollView>
        ) :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      }

      <TouchableOpacity style={styles.floatingButton} onPress={goToInsights}>
        <Text style={styles.floatingButtonText}>View Insights</Text>
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
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  fullCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
  },
  graphContainer: {
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    color: '#6200EE',
    width: '100%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NutrientIntakeScreen;

