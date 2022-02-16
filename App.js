import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
// Import Context
import {MainProvider} from './contexts/MainContext';

// Import Navigation
import Navigator from './navigation/navigator';

// Import from UI Kitten Library
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import theme from './utils/theme.json';

// Import fonts
import {
  Karla_400Regular,
  Karla_400Regular_Italic,
  Karla_700Bold,
  Karla_700Bold_Italic,
} from '@expo-google-fonts/karla';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

const App = () => {
  // use fonts
  let [fontsLoaded, error] = useFonts({
    Karla_400Regular,
    Karla_400Regular_Italic,
    Karla_700Bold,
    Karla_700Bold_Italic,
    'Karla': require('./assets/fonts/Karla.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      {/* <ProducDetail /> */}
      <MainProvider>
        <Navigator />
      </MainProvider>
    </>
  );
};

export default () => (
  <>
    <IconRegistry icons={[EvaIconsPack]} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <App />
    </ApplicationProvider>
  </>
);
