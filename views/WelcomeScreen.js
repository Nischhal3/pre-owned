import React, {useContext, useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {getUserByToken} from '../hooks/ApiHooks';
import {AppButton} from '../components/elements/AppButton';

// Lottie animation
import LottieView from 'lottie-react-native';
import {Layout, Text} from '@ui-kitten/components';
import colors from '../utils/colors';

const WelcomeScreen = ({navigation}) => {
  const animation = React.createRef(); // animation
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
    // animation.current?.play();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/backgrounds/OnBoarding.png')}
    >
      {/* <Layout style={styles.inner}> */}

      {/* <LottieView
        ref={animation}
        source={require('../assets/brand/PreOwned-animation.json')}
        style={styles.animation}
        loop={true}
      /> */}

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
      {/* </Layout> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // animation: {
  //   width: '100%',
  //   height: '70%',
  //   marginBottom: 20,
  //   alignSelf: 'center',
  // },
  // inner: {
  //   width: 400,
  //   height: undefined,
  //   backgroundColor: colors.primary,
  //   alignSelf: 'center',
  // },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
