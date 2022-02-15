import React from 'react';
import {StatusBar} from 'expo-status-bar';
// Import Context
import {MainProvider} from './contexts/MainContext';
// Import Views
import WelcomeScreen from './views/WelcomeScreen';
import ExploreScreen from './views/Explore';
import ProductDetail from './views/ProductDetail';

// Import Navigation
import Navigator from './navigation/navigator';

// Import from UI Kitten Library
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import theme from './utils/theme.json';

// Fonts
import {useFonts} from 'expo-font';
import ListingEditScreen from './views/ListingEditScreen';

const App = () => {
  const [loaded] = useFonts({
    Karla: require('./assets/fonts/Karla-Regular.ttf'),
  });
  return (
    <>
      {/* <ProducDetail /> */}
      <ListingEditScreen />
      {/* <MainProvider>
        <Navigator />
      </MainProvider> */}
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
