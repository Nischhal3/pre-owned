import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import Views
import AppIntro from '../views/AppIntro';
import SplashScreen from '../views/SplashScreen';

const Stack = createNativeStackNavigator();

const Splash = () => {
  return (
    
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 3 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppIntro"
          component={AppIntro}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
  
  );
};

const Navigator = () => {
  return (
    <>
      <Splash />
    </>
  );
};

export default Navigator;
