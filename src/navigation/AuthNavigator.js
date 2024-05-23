import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from '../screens/auth/LandingScreen';
import SignupScreen from '../screens/auth/SignupScreen'; 
import LoginScreen from '../screens/auth/LoginScreen';

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Landing" component={LandingScreen} />
      <AuthStack.Screen name="SignUp" component={SignupScreen} /> 
      <AuthStack.Screen name="Login" component={LoginScreen} /> 
    </AuthStack.Navigator>
  );
}

export default function AuthNavigator() {
  return (
    <AuthStackScreen /> 
  );
}
