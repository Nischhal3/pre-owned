import React, {useContext} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Drawer,
  DrawerItem,
  IndexPath,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Explore from '../../views/Explore';
import Search from '../../views/Search';
import AddListing from '../../views/AddListing';
<<<<<<< HEAD
=======
import MyListings from '../../views/Listings/MyListings';
import Favourite from '../../views/Favourite';
import Profile from '../../views/Profile';
import EditProfile from '../../views/EditProfile';
import {MainContext} from '../../contexts/MainContext';
import ProductDetail from '../../views/ProductDetail';
import PopularNow from '../../views/PopularNow';
import RecentlyAdded from '../../views/RecentlyAdded';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> 6a463e8997bb9c57c6fb5ab59962d00f086440e1
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
