import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// components
import Explore from '../views/Explore';
import Search from '../views/Search';

// views import
import {AddListing} from '../views/Listings';

// navigation import
import MenuNavigator from './Drawer';

const Tab = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    indicatorStyle={{backgroundColor: '#58854A'}}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Explore"
      icon={<Icon name="compass-outline" />}
    />
    <BottomNavigationTab title="Search" icon={<Icon name="search-outline" />} />
    <BottomNavigationTab
      title="Add Listing"
      icon={<Icon name="plus-circle-outline" />}
    />
    <BottomNavigationTab
      title="Profile"
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
        name="Search"
        component={Search}
        options={{headerTitleAlign: 'center'}}
      ></Tab.Screen>
      <Tab.Screen
        name="Add Listing"
        component={AddListing}
        options={{headerTitleAlign: 'center'}}
      ></Tab.Screen>
      <Tab.Screen
        name="ProfileWrap"
        component={MenuNavigator}
        options={{headerShown: false}}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabScreen;
