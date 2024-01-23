
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'

const permissions = {
  permissions: {
    read: [
      "ActiveEnergyBurned",
      "ActivitySummary",
      "AllergyRecord",
      "AppleExerciseTime",
      "AppleStandTime",
      "BasalEnergyBurned",
      "BiologicalSex",
      "BloodType",
      "BloodAlcoholContent",
      "BloodGlucose",
      "BloodPressureDiastolic",
      "BloodPressureSystolic",
      "BodyFatPercentage",
      "BodyMass",
      "BodyMassIndex",
      "BodyTemperature",
      "DateOfBirth",
      "Biotin",
      "Caffeine",
      "Calcium",
      "Carbohydrates",
      "Chloride",
      "Cholesterol",
      "ConditionRecord",
      "Copper",
      "CoverageRecord",
      "Electrocardiogram",
      "EnergyConsumed",
      "EnvironmentalAudioExposure",
      "FatMonounsaturated",
      "FatPolyunsaturated",
      "FatSaturated",
      "FatTotal",
      "Fiber",
      "Folate",
      "HeadphoneAudioExposure",
      "ImmunizationRecord",
      "Iodine",
      "Iron",
      "LabResultRecord",
      "Magnesium",
      "Manganese",
      "MedicationRecord",
      "Molybdenum",
      "Niacin",
      "PantothenicAcid",
      "Phosphorus",
      "Potassium",
      "ProcedureRecord",
      "Protein",
      "Riboflavin",
      "Selenium",
      "Sodium",
      "Sugar",
      "Thiamin",
      "VitaminA",
      "VitaminB12",
      "VitaminB6",
      "VitaminC",
      "VitaminD",
      "VitaminE",
      "VitaminK",
      "Zinc",
      "Water",
      "DistanceCycling",
      "DistanceSwimming",
      "DistanceWalkingRunning",
      "FlightsClimbed",
      "HeartbeatSeries",
      "HeartRate",
      "RestingHeartRate",
      "HeartRateVariability",
      "Height",
      "LeanBodyMass",
      "MindfulSession",
      "NikeFuel",
      "RespiratoryRate",
      "SleepAnalysis",
      "StepCount",
      "Steps",
      "VitalSignRecord",
      "Vo2Max",
      "WalkingHeartRateAverage",
      "Weight",
      "Workout",
      "PeakFlow",      
    ],
    write: [],
  },
} as HealthKitPermissions

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!')
  }

  /* Can now read or write to HealthKit */

  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  }

  AppleHealthKit.getHeartRateSamples(
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
  )
})

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
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
