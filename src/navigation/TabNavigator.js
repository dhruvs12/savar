import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryScreen from '../screens/DiaryScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>

        <Tab.Screen 
            name="Diary" 
            component={DiaryScreen}
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