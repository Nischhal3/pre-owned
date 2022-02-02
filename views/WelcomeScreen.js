import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';

function WelcomeScreen({navigation}) {
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
          navigation.navigate('Register');
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
  },
});

export default WelcomeScreen;
