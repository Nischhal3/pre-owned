import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// UI kitten library import
import {
  Icon,
  Drawer,
  DrawerItem,
} from '@ui-kitten/components';

// Drawer navigation import
import {createDrawerNavigator} from '@react-navigation/drawer';

// views import
import Favourite from '../views/Favourite';
import Profile from '../views/Profile';
import EditProfile from '../views/EditProfile';
import {MyListings} from '../views/Listings';

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
    <Drawer>
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
  <Menu.Navigator drawerContent={(props) => <MenuContent {...props} />} initialRouteName="Profile" defaultStatus='closed'>
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
      name="My Listings"
      component={MyListings}
      options={{headerTitleAlign: 'center'}}
    />
  </Menu.Navigator>
);

export default MenuNavigator;
