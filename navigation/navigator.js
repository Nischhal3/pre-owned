import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../views/WelcomeScreen';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const TabScreen = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;
//           switch (route.name) {
//             case 'Home':
//               iconName = 'home';
//               break;
//             case 'Upload':
//               iconName = 'cloud-upload';
//               break;
//             case 'Profile':
//               iconName = 'account-box';
//               break;
//           }
//           return <Icon name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={Home}></Tab.Screen>
//       <Tab.Screen name='Profile' component={Profile}></Tab.Screen>
//     </Tab.Navigator>
//   );
// };

const StackScreen = () => {
  //   const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator>
      {/* {isLoggedIn ?
      <>
        <Stack.Screen options={{headerShown: false}} name='Main' component={TabScreen}></Stack.Screen>
        <Stack.Screen name='Single' component={Single}></Stack.Screen>
        <Stack.Screen name="Modify user" component={ModifyUser}></Stack.Screen>
      </>
      :
      <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        ></Stack.Screen>
      } */}
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Register"
        component={SignUp}
        options={{headerShown: false}}
      /> */}
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
