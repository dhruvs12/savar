import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import AppleHealthKit from 'react-native-health';
import { RecipeView } from './components/RecipeView';
import { getRecipe } from './api/chatGPT';

const healthKitOptions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.DietaryEnergyConsumed, AppleHealthKit.Constants.Permissions.Height, AppleHealthKit.Constants.Permissions.BodyMass],
    write: [AppleHealthKit.Constants.Permissions.DietaryEnergyConsumed],
  },
};

const App = () => {
  const [recipe, setRecipe] = useState(null);
  const [healthData, setHealthData] = useState({});

  useEffect(() => {
    AppleHealthKit.initHealthKit(healthKitOptions, (error) => {
      if (error) {
        console.log("Error initializing Health kit: ", error);
        return;
      }
      // Fetch Dietary Energy Consumed for today
      let options = {
        startDate: new Date(new Date().setHours(0,0,0,0)).toISOString(),
      };
      AppleHealthKit.getDietaryEnergyConsumed(options, (err, results) => {
        if (err) {
          return;
        }
        setHealthData(results);
      });
    });
  }, []);

  const fetchRecipe = async () => {
    const recipeResponse = await getRecipe(healthData);
    setRecipe(recipeResponse);
  };

  return (
    <SafeAreaView>
      <Text>Recipe Recommender</Text>
      <Button title="Get Recipe Recommendation" onPress={fetchRecipe} />
      {recipe && <RecipeView recipe={recipe} />}
    </SafeAreaView>
  );
};

export default App;
