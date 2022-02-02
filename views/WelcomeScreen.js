import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import {btnBackground} from '../utils/colors';

function WelcomeScreen({navigation}) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/backgrounds/OnBoarding.png')}
    >
      <Button style={styles.button} >Log In</Button>
      <Button style={styles.button} onPress={() => {navigation.navigate('Login')}}>Create an account</Button>
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
