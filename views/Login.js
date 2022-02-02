import {View, Text} from 'react-native';
import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Layout} from '@ui-kitten/components';
import {primary, btnBackground} from '../utils/colors';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Layout>
      <Image
        style={styles.background}
        source={require('../assets/backgrounds/LoginBG.png')}
      />
      <Card style={styles.container}>
        <LoginForm />
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
  },
  container: {
    width: '100%',
    height: '100%',
    marginTop: '80%',
    backgroundColor: primary,
  },
});

export default Login;
