import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryScreen from '../screens/diary/DiaryScreen';
import FavoriteMealsScreen from '../screens/diary/FavoriteMealsScreen';
import NewMealScreen from '../screens/diary/NewMealScreen';
import SearchFoodScreen from '../screens/diary/SearchFoodScreen';
import NutritionScreen from '../screens/diary/NutritionScreen';
import NutrientIntakeScreen from '../screens/health/NutrientGraphsScreen';
import RecipeScreen from '../screens/recipe/RecipeScreen';
import AccountScreen from '../screens/account/AccountScreen';
import InsightsScreen from '../screens/health/InsightsScreen';

const Tab = createBottomTabNavigator();

const DiaryStack = createStackNavigator();
const HealthStack = createStackNavigator();
const RecipeStack = createStackNavigator();
const AccountStack = createStackNavigator();

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

function HealthStackScreen() {
  return (
    <HealthStack.Navigator screenOptions={{ headerShown: false }}>
      <HealthStack.Screen name="NutrientIntake" component={NutrientIntakeScreen}/>
      <HealthStack.Screen name="InsightsScreen" component={InsightsScreen}/>
    </HealthStack.Navigator>
  );
}

function RecipeStackScreen() {
  return (
    <RecipeStack.Navigator screenOptions={{ headerShown: false }}>
      <RecipeStack.Screen name="Recipe" component={RecipeScreen}/>
    </RecipeStack.Navigator>
  )
}

function AccountStackScreen() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="Account" component={AccountScreen}/>
    </AccountStack.Navigator>
  )
}

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="DiaryStack" 
        component={DiaryStackScreen}
        options={{
          tabBarLabel: 'Diary',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="notebook-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HealthStack"
        component={HealthStackScreen}
        options={{
          tabBarLabel: 'Health',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecipeStack"
        component={RecipeStackScreen}
        options={{
          tabBarLabel: 'Recipe',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="chef-hat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStackScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}