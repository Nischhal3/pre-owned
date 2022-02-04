import React, {useContext, useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import {btnBackground} from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {getUserByToken} from '../hooks/ApiHooks';

function WelcomeScreen({navigation}) {
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log('token value in async storage', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      // console.log('chekToken', userData);
      // console.log('token', userToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/backgrounds/OnBoarding.png')}
    >
      <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        Log In
      </Button>
      <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        Create an account
      </Button>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 60,
    bottom: 50,
    margin: 10,
    backgroundColor: btnBackground,
    borderColor: btnBackground,
  },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
