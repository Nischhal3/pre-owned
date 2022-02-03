import React from 'react';
import {StatusBar} from 'expo-status-bar';

// Import Context
import {MainProvider} from './contexts/MainContext';

// Import Views
import WelcomeScreen from './views/WelcomeScreen';

// Import Navigation
import Navigator from './navigation/navigator';

// Import from UI Kitten Library
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import ProductDetail from './views/ProductDetail';


const App = () => {
  return (
    <>
    <ProductDetail />
      {/* <MainProvider>
        <Navigator />
      </MainProvider> */}
    </>
  );
};

export default () => (
  <>
    <IconRegistry icons={[EvaIconsPack]} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <App />
    </ApplicationProvider>
  </>
);
