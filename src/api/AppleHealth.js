import AppleHealthKit from 'react-native-health';

const healthKitOptions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
            AppleHealthKit.Constants.Permissions.BodyFatPercentage,
            AppleHealthKit.Constants.Permissions.HeartRate,
            AppleHealthKit.Constants.Permissions.SleepAnalysis,
            AppleHealthKit.Constants.Permissions.Weight,
        ],
    },
};

const initHealthKit = () => {
    AppleHealthKit.initHealthKit(healthKitOptions, (err) => {
        if (err) {
            console.error("Error initializing Health Kit:", err);
            return;
        }
        console.log("HealthKit initialized");
    });
};

const fetchSleepData = (options) => {
  return new Promise((resolve, reject) => {
      AppleHealthKit.getSleepSamples(options, (err, results) => {
          if (err) {
              reject(err);
              return;
          }
          
          // Organize sleep data by day
          const sleepDataByDay = {};
          results.forEach(sample => {
              const date = sample.startDate.split('T')[0]; // Extracting the date part
              if (!sleepDataByDay[date]) {
                  sleepDataByDay[date] = [];
              }
              sleepDataByDay[date].push({
                  startDate: sample.startDate,
                  endDate: sample.endDate,
                  value: sample.value,
              });
          });
          
          // Resolve with sleep data organized by day
          resolve(sleepDataByDay);
      });
  });
};

export { initHealthKit, fetchSleepData };