import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryScreen from '../screens/DiaryScreen';
import FavoriteMealsScreen from '../screens/FavoriteMealsScreen';
import NewMealScreen from '../screens/NewMealScreen';
import SearchFoodScreen from '../screens/SearchFoodScreen';
import NutritionScreen from '../screens/NutritionScreen';


const Tab = createBottomTabNavigator();
const DiaryStack = createStackNavigator();

function DiaryStackScreen() {
  return (
    <DiaryStack.Navigator screenOptions={{ headerShown: false }}>
      <DiaryStack.Screen name="Diary" component={DiaryScreen} />
      <DiaryStack.Screen name="FavoriteMeals" component={FavoriteMealsScreen} />  
      <DiaryStack.Screen name="NewMeals" component={NewMealScreen} />  
      <DiaryStack.Screen name="SearchFood" component={SearchFoodScreen} />
      <DiaryStack.Screen name="NutritionScreen" component={NutritionScreen} />
    </DiaryStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="DiaryStack" // This is the name used in the navigator
        component={DiaryStackScreen} // This now points to the stack navigator
        options={{
          tabBarLabel: 'Diary',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="notebook-multiple" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}