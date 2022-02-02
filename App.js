// Import Views
import WelcomeScreen from './views/WelcomeScreen';

// Import from UI Kitten Library
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {default as theme} from './utils/theme.json';

// link fonts with the native side
import {default as mapping} from './utils/mapping.json';

const HomeScreen = () => <WelcomeScreen />;

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);
