import React from 'react';
import {StatusBar} from 'expo-status-bar';
// Import Context
import {MainProvider} from './contexts/MainContext';
// Import Views
import WelcomeScreen from './views/WelcomeScreen';

// Import from UI Kitten Library
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const App = () => <WelcomeScreen />;

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);
