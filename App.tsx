/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';

import LandingScreen from './src/screens/auth/LandingScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import MealCard from './src/components/MealCard';
import DiaryScreen from './src/screens/diary/DiaryScreen';
import TabNavigator from './src/navigation/TabNavigator';
import FavoriteMealCard from './src/components/FavoriteMealCard';
import FavoriteMealsScreen from './src/screens/diary/FavoriteMealsScreen';
import NewMealScreen from './src/screens/diary/NewMealScreen';
import SearchFoodScreen from './src/screens/diary/SearchFoodScreen';
import NutritionScreen from './src/screens/diary/NutritionScreen';

import sampleFoodData from './src/assets/data/sample-food-data.json';

import NutritionLabel from './src/components/NutritionLabel';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {

  const exampleNutritionData = {
    servingSize: '1 medium serving (117 g)',
    calories: 378,
    totalFat: 18,
    saturatedFat: 2.7,
    transFat: 0.1,
    cholesterol: 0, // Assuming the value is zero or not available
    sodium: 221,
    totalCarbohydrate: 50,
    dietaryFiber: 4.6,
    totalSugars: 0.2,
    addedSugars: 0, // Assuming the value is zero or not available
    protein: 4,
    vitaminD: 0, // Assuming the value is zero or not available
    calcium: 19,
    iron: 0.51,
    potassium: 697
  };

  return (
    // <LandingScreen/>
    // <SignupScreen/>
    // <LoginScreen/>

    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>

    // <NutritionScreen foodData={sampleFoodData}/>

  )
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={backgroundStyle}>
  //       <Header />
  //       <View
  //         style={{
  //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //         }}>
  //         <Section title="Step One">
  //           Edit <Text style={styles.highlight}>App.tsx</Text> to change this
  //           screen and then come back to see your edits.
  //         </Section>
  //         <Section title="See Your Changes">
  //           <ReloadInstructions />
  //         </Section>
  //         <Section title="Debug">
  //           <DebugInstructions />
  //         </Section>
  //         <Section title="Learn More">
  //           Read the docs to discover what to do next:
  //         </Section>
  //         <LearnMoreLinks />
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
