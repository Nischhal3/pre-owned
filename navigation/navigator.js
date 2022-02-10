import React, {useContext} from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../views/WelcomeScreen';
import Login from '../views/Login';
import Explore from '../views/Explore';
import Message from '../views/Message';
import AddListing from '../views/AddListing';
import Favourite from '../views/Favourite';
import Account from '../views/Account';
import {MainContext} from '../contexts/MainContext';
import colors from '../utils/colors';
import PopularNow from '../views/PopularNow';
import RecentlyAdded from '../views/RecentlyAdded';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    indicatorStyle={{backgroundColor: '#58854A'}}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Explore"
      icon={<Icon name="search-outline" />}
    />
    <BottomNavigationTab
      title="Message"
      icon={<Icon name="message-circle-outline" />}
    />
    <BottomNavigationTab
      title="Add Listing"
      icon={<Icon name="plus-circle-outline" />}
    />
    <BottomNavigationTab
      title="Favourite"
      icon={<Icon name="heart-outline" />}
    />
    <BottomNavigationTab
      title="Account"
      icon={<Icon name="person-outline" />}
    />
  </BottomNavigation>
);

const TabScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerTitleAlign: 'center',
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Message"
        component={Message}
        options={{headerTitleAlign: 'center'}}
      ></Tab.Screen>
      <Tab.Screen
        name="Add Listing"
        component={AddListing}
        options={{headerTitleAlign: 'center'}}
      ></Tab.Screen>
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{headerTitleAlign: 'center'}}
      ></Tab.Screen>
      <Tab.Screen
        name="Account"
        component={Account}
        options={{headerTitleAlign: 'center'}}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

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
          ></Stack.Screen>
          <Stack.Screen
            name="Recently added"
            component={RecentlyAdded}
            options={{headerShown: true}}
          ></Stack.Screen>
          <Stack.Screen
            name="Popular now"
            component={PopularNow}
            options={{headerShown: true}}
          ></Stack.Screen>
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
      {/* <Stack.Screen options={{headerShown: false}} name='Main' component={TabScreen}></Stack.Screen>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}></Stack.Screen> */}
    </Stack.Navigator>
  );
};

const navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default navigator;
