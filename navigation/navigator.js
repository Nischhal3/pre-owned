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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GlobalStyles from '../utils/GlobalStyles';
import Welcome from '../views/WelcomeScreen';
import Login from '../views/Login';
import Explore from '../views/Explore';
import Message from '../views/Message';
import Search from '../views/Search';
import AddListing from '../views/AddListing';
import MyListing from '../views/MyListing';
import Favourite from '../views/Favourite';
import Profile from '../views/Profile';
import EditProfile from '../views/EditProfile';
import {MainContext} from '../contexts/MainContext';
import colors from '../utils/colors';
import ProductDetail from '../views/ProductDetail';
import PopularNow from '../views/PopularNow';
import RecentlyAdded from '../views/RecentlyAdded';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Menu = createDrawerNavigator();

const MenuContent = ({navigation, page}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const logout = () => {
    Alert.alert('Log Out', 'Confirm Logout?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: () => {
          AsyncStorage.clear();
          setIsLoggedIn(false);
        },
      },
    ]);
  };
  return (
    <Drawer
    // selectedIndex={new IndexPath(state.index)}
    // onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
    >
      <DrawerItem
        title="Profile"
        accessoryLeft={<Icon name="person-outline" />}
        onPress={() => {
          navigation.navigate('Profile', {file: page});
        }}
      />
      <DrawerItem
        title="Edit Profile"
        accessoryLeft={<Icon name="edit-outline" />}
        onPress={() => {
          navigation.navigate('Edit Profile', {file: page});
        }}
      />
      <DrawerItem
        title="My Favorites"
        accessoryLeft={<Icon name="heart-outline" />}
        onPress={() => {
          navigation.navigate('My Favorites', {file: page});
        }}
      />
      <DrawerItem
        title="My Messages"
        accessoryLeft={<Icon name="message-circle-outline" />}
        onPress={() => {
          navigation.navigate('My Message', {file: page});
        }}
      />
      <DrawerItem
        title="My Listings"
        accessoryLeft={<Icon name="list-outline" />}
        onPress={() => {
          navigation.navigate('My Listings', {file: page});
        }}
      />
      <DrawerItem
        title="Logout"
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={logout}
      />
    </Drawer>
  );
};

const MenuNavigator = () => (
  <Menu.Navigator drawerContent={(props) => <MenuContent {...props} />}>
    <Menu.Screen
      name="Profile"
      component={Profile}
      options={{headerTitleAlign: 'center'}}
    />
    <Menu.Screen
      name="Edit Profile"
      component={EditProfile}
      options={{headerTitleAlign: 'center'}}
    />
    <Menu.Screen
      name="My Favorites"
      component={Favourite}
      options={{headerTitleAlign: 'center'}}
    />
    <Menu.Screen
      name="My Message"
      component={Message}
      options={{headerTitleAlign: 'center'}}
    />
    <Menu.Screen
      name="My Listings"
      component={MyListing}
      options={{headerTitleAlign: 'center'}}
    />
  </Menu.Navigator>
);

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
            name="Recently added"
            component={RecentlyAdded}
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
