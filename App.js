import React from 'react';
import {StatusBar} from 'expo-status-bar';
// Import Context
import {MainProvider} from './contexts/MainContext';
// Import Views
import WelcomeScreen from './views/WelcomeScreen';
import ExploreScreen from './views/Explore';

// Import from UI Kitten Library
import {ApplicationProvider, IconRegistry, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// const App = () => <WelcomeScreen />
const App = () => <ExploreScreen />

export default () => (
  <>
   <IconRegistry icons={EvaIconsPack} />
   <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
  </>

);
