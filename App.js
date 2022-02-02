import React from 'react';
import {StatusBar} from 'expo-status-bar';

// Import Context
import {MainProvider} from './contexts/MainContext';

// Import Views
import WelcomeScreen from './views/WelcomeScreen';

// Import Navigation
import Navigator from './navigation/navigator';

// Import from UI Kitten Library
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const App = () => {
  return (
    <>
      <MainProvider>
        <Navigator />
      </MainProvider>
    </>
  );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);
