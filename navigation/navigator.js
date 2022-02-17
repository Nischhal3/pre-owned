import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GlobalStyles from '../utils/GlobalStyles';
import Welcome from '../views/WelcomeScreen';
import Login from '../views/Login';
import Profile from '../views/Profile';
import {MainContext} from '../contexts/MainContext';
import ProductDetail from '../views/ProductDetail';
import PopularNow from '../views/PopularNow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllProducts from '../views/AllProducts';
import TabScreen from '../components/navComponents/Bottom';

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
