import firestore from '@react-native-firebase/firestore';
import { NUTRIENT_IDS } from '../constants/nutrientIds';

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

export const getNutrientTotalsByDayPastWeek = async () => {
    
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    try {
      const querySnapshot = await firestore()
        .collection('diary')
        .where('date', '>=', startDate)
        .get();

      const totalsByDay = {};

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const day = data.date.toDate().getDay();

        // Initialize totals for each day if not already present
        if (!totalsByDay[day]) {
          totalsByDay[day] = Object.keys(NUTRIENT_IDS).reduce((acc, key) => {
            acc[key] = 0;
            return acc;
          }, {});
        }
        
        // Sum nutrients for each food item
        data.foods.forEach(food => {
          Object.entries(food.nutrientMap).forEach(([key, nutrientInfo]) => {
            const nutrientId = parseInt(key);
            const nutrientKey = Object.keys(NUTRIENT_IDS).find(key => NUTRIENT_IDS[key] === nutrientId);

            if (nutrientKey && nutrientInfo.amount) {
              totalsByDay[day][nutrientKey] += nutrientInfo.amount;
            }
          });
        });
      });

      // Transform the totals into an array sorted by day of the week
      const sortedData = Object.entries(totalsByDay).map(([day, nutrients]) => ({
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day],
        ...nutrients
      }));

      return sortedData;

    } catch (error) {
      console.error("Error fetching nutrient totals: ", error);
      throw error; // Rethrow the error so you can handle it in the component
    }
};

export const fetchHealthData = async (startDate, endDate) => {
  const healthCollection = firestore().collection('health');
  const snapshot = await healthCollection
    .where('date', '>=', startDate)
    .where('date', '<=', endDate)
    .orderBy('date')
    .get();

  const data = [];
  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};
