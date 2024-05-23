import firestore from '@react-native-firebase/firestore';
import { NUTRIENT_IDS } from '../constants/nutrientIds';
import { getCurrentUserId } from './FirestoreAuthService';

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
  const userId = getCurrentUserId();
  if (!userId) {
    console.error('No user logged in');
    return { success: false, error: 'No user logged in' };
  }

  mealData.userId = userId; // Include the user ID in the meal data
  mealData.foods.forEach(food => {
    food.nutrientMap = cleanNutrientMap(food.nutrientMap);
  });

  try {
    const documentRef = await firestore().collection('diary').add(mealData);
    console.log('Added to diary with ID:', documentRef.id);
    return { success: true, id: documentRef.id };
  } catch (error) {
    console.error('Error adding meal to Firestore:', error);
    return { success: false, error };
  }
};

export const fetchMeals = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    console.error('No user logged in');
    return { success: false, error: 'No user logged in' };
  }

  try {
    const mealsCollection = firestore().collection('diary').where('userId', '==', userId);
    const snapshot = await mealsCollection.get();
    const meals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, meals };
  } catch (error) {
    console.error('Error fetching meals from Firestore:', error);
    return { success: false, error };
  }
};

export const getNutrientTotalsByDayPastWeek = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    console.error('No user logged in');
    return { success: false, error: 'No user logged in' };
  }

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  try {
    const querySnapshot = await firestore()
      .collection('diary')
      .where('userId', '==', userId) // Add the user filter here
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

export const getFavoriteMeals = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    console.error('No user logged in');
    return []; // Return empty array if no user is logged in
  }

  try {
    const snapshot = await firestore()
      .collection('diary')  // Assuming 'diary' is your collection name
      .where('userId', '==', userId)  // Filter by the current user ID
      .where('isFavorite', '==', true)  // Filter for favorite meals
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching favorite meals:", error);
    return []; // Return empty array on error
  }
};

export const getDiaryNamesFromPastWeek = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    console.error('No user logged in');
    return { success: false, error: 'No user logged in' };
  }

  // Calculate the start and end dates for the past week
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  try {
    const diaryCollection = firestore().collection('diary')
      .where('userId', '==', userId)
      .where('date', '>=', startDate)
      .where('date', '<=', endDate);

    const snapshot = await diaryCollection.get();
    const diaryNames = snapshot.docs.map(doc => doc.data().mealName);
    const diary = { "diary": diaryNames };
    return { success: true, diary };
  } catch (error) {
    console.error('Error fetching diary names from the past week:', error);
    return { success: false, error };
  }
};