import React, {useContext, useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {getUserByToken} from '../hooks/UserApi';
import {AppButton} from '../components/elements/AppButton';
import colors from '../utils/colors';

function WelcomeScreen({navigation}) {
  const {setIsLoggedIn, setUser, setFormToggle} = useContext(MainContext);

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
      {/* <Layout style={styles.btnContainer}></Layout> */}
      <AppButton
        title="Login"
        onPress={() => {
          setFormToggle(true);
          navigation.navigate('Login');
        }}
      />
      <AppButton
        style={{marginBottom: 50}}
        title="Create an account"
        onPress={() => {
          setFormToggle(false);
          navigation.navigate('Login');
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // btnContainer: {
  //   padding: 20,
  //   width: '100%',
  //   backgroundColor: colors.text_light,
  // },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
