import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

// Lottie animation
import LottieView from 'lottie-react-native';
import {Layout} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import {MainContext} from '../contexts/MainContext';

// hooks import
import {getToken} from '../hooks/CommonFunction';
import {getUserByToken} from '../hooks/ApiHooks';

// components import
import {AppButton} from '../components/elements/AppButton';

// Import screen orientation
import screenOrientation from '../components/screenOrientation';

const WelcomeScreen = ({navigation}) => {
  // Screen orientation
  const [orientation, setOrientation] = useState(
    screenOrientation.isPortrait() ? 'portrait' : 'landscape'
  );
  const animation = React.createRef(); // animation
  const {setIsLoggedIn, setUser, setFormToggle} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = await getToken();
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken();
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    checkToken();
    animation.current?.play();
    Dimensions.addEventListener('change', () => {
      setOrientation(screenOrientation.isPortrait() ? 'portrait' : 'landscape');
    });
  }, []);

  if (orientation === 'portrait') {
    return (
      <Layout style={styles.inner}>
        <LottieView
          ref={animation}
          source={require('../assets/brand/animation.json')}
          loop={false}
        />
        <Layout style={styles.btnContainter}>
          <AppButton
            title="Continue"
            onPress={() => {
              setFormToggle(false);
              navigation.navigate('Login');
            }}
          />
        </Layout>
      </Layout>
    );
  } else {
    return (
      <Layout style={styles.innerLandscape}>
        <LottieView
          ref={animation}
          source={require('../assets/brand/animation.json')}
          loop={false}
        />
        <Layout style={styles.btnContainterLandscape}>
          <AppButton
            appBtnStyle={styles.btnLandscape}
            title="Continue"
            onPress={() => {
              setFormToggle(false);
              navigation.navigate('Login');
            }}
          />
        </Layout>
      </Layout>
    );
  }
};

const styles = StyleSheet.create({
  btnContainter: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: '20%',
  },
  inner: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerLandscape: {
    height: '130%',
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnContainterLandscape: {
    backgroundColor: 'transparent',
    marginBottom: 110,
  },
  btnLandscape: {
    width: 130,
  },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
