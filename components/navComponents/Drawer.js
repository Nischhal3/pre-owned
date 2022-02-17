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
import {createDrawerNavigator} from '@react-navigation/drawer';
import Message from '../../views/Message';
import MyListing from '../../views/MyListing';
import Favourite from '../../views/Favourite';
import Profile from '../../views/Profile';
import EditProfile from '../../views/EditProfile';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          navigation.navigate('My Messages', {file: page});
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
      name="My Messages"
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

export default MenuNavigator;
