import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Layout, Image} from '@ui-kitten/components';

// Import colors
import colors from '../utils/colors';

function SplashScreen({navigation}) {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      //   AsyncStorage.getItem('user_id').then((value) =>
      //     navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes')
      //   );
    }, 5000);
  }, []);
  return (
    <Layout style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/brand/PreOwned.png')}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  image: {
    width: '90%',
    resizeMode: 'contain',
    margin: 30,
  },
});

export default SplashScreen;
