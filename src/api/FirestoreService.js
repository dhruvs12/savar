import firestore from '@react-native-firebase/firestore';

function cleanNutrientMap(data) {
  const cleanedData = {};
  Object.keys(data).forEach(key => {
      const nutrient = data[key];
      // Check if any property in the nutrient object is undefined
      const hasUndefined = Object.values(nutrient).some(value => value === undefined);
      if (!hasUndefined) {
          cleanedData[key] = nutrient;
      }
  });
  return cleanedData;
}


// Function to add a meal to Firestore
export const addMeal = async (mealData) => {
  mealData.foods.forEach(food => {
    food.nutrientMap = cleanNutrientMap(food.nutrientMap); // assuming nutrientMap is the object to be cleaned
  });
  console.log(mealData.foods[0].nutrientMap);
  try {
    const documentRef = await firestore()?.collection('diary').add(mealData);
    console.log('Added to diary with ID:', documentRef.id);
    return { success: true, id: documentRef.id };
  } catch (error) {
    console.error('Error adding meal to Firestore:', error);
    return { success: false, error };
  }
};

// Function to fetch meals from Firestore
export const fetchMeals = async () => {
  try {
    const mealsCollection = firestore().collection('diary');
    const snapshot = await mealsCollection.get();
    const meals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(meals);
    return { success: true, meals };
  } catch (error) {
    console.error('Error fetching meals from Firestore:', error);
    return { success: false, error };
  }
};

// More functions can be added here for updating or deleting meals
