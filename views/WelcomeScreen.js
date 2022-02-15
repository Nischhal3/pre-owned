import React, {useContext, useEffect} from 'react';
import {ImageBackground, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {getUserByToken} from '../hooks/ApiHooks';
import {AppButton} from '../components/elements/AppButton';

// Lottie animation
import LottieView from 'lottie-react-native';
import {Layout, Text} from '@ui-kitten/components';
import colors from '../utils/colors';
import {getToken} from '../hooks/CommonFunction';

const WelcomeScreen = ({navigation}) => {
  const animation = React.createRef(); // animation
  const {setIsLoggedIn, setUser, setFormToggle, setUsername} =
    useContext(MainContext);

  const checkToken = async () => {
    const userToken = await getToken();
    // console.log('token value in async storage', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken();
      // console.log('chekToken', userData);
      // console.log('token', userToken);
      setUser(userData);
      setUsername(userData.username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
    animation.current?.play();
  }, []);

  return (
    <Layout style={styles.inner}>
      <LottieView
        ref={animation}
        source={require('../assets/brand/animation.json')}
        loop={false}
      />
      <Layout style={styles.btnContainter}>
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
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnContainter: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  inner: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
