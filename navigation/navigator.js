import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {MainContext} from '../contexts/MainContext';

// Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Styling import
import GlobalStyles from '../utils/GlobalStyles';
import {colors} from '../utils';

// Views import
import Welcome from '../views/WelcomeScreen';
import Login from '../views/Login';
import ProductDetail from '../views/ProductDetail';
import PopularNow from '../views/PopularNow';
import AllProducts from '../views/AllProducts';
import {EditListing} from '../views/Listings';
import Profile from '../views/Profile';

// Bottom navigator import
import TabScreen from './Bottom';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name="Main"
            component={TabScreen}
          />
          <Stack.Screen
            name="All products"
            component={AllProducts}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Popular now"
            component={PopularNow}
            options={{headerShown: true}}
          />
          <Stack.Screen name="Product Detail" component={ProductDetail} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Edit Listing" component={EditListing} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          ></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

const navigator = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <StackScreen />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default navigator;
