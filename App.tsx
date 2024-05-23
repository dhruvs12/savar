import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { onAuthStateChange } from './src/api/FirestoreAuthService';

function App(): React.JSX.Element {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange(user => {
      setUserLoggedIn(!!user); // `!!user` converts the user to a boolean indicating logged in status
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {userLoggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
