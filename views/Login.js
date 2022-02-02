import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, Layout, ButtonGroup, Button, Text, Toggle} from '@ui-kitten/components';
import {primary, btnBackground} from '../utils/colors'
import SignupForm from '../components/SignupForm';
import {Switch} from 'react-native-switch';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);
  const [colorToggle, setColorToggle] = useState(true);

  return (
    <Layout>
      <Image
        style={styles.background}
        source={require('../assets/backgrounds/LoginBG.png')}
      />
      <Card style={styles.container}>
          <ButtonGroup
            style={styles.toggleGroup}
            selectedIndex={formToggle ? 0 : 1}>
            <Button style={styles.toggleButton} onPress={() => setFormToggle(true)}>Log In</Button>
            <Button style={styles.toggleButton} onPress={() => setFormToggle(false)}>Sign Up</Button>
          </ButtonGroup>
          {formToggle ? (
            <Card>
              {/* <Card.Title h4>Login</Card.Title> */}
              {/* <Card.Divider /> */}
              {/* <LoginForm /> */}
              <Text>Login</Text>
            </Card>
          ) : (
            <Card>
              {/* <Card.Title h4>Register</Card.Title>
              <Card.Divider /> */}
              <Text>Signup</Text>
              <SignupForm setFormToggle={setFormToggle} />
            </Card>
          )}
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute'
  },
  container: {
    width: '100%',
    height: '100%',
    marginTop: '80%',
    backgroundColor: primary,
    borderColor: primary,
  },
  toggleGroup: {
    justifyContent: 'center',
  },
  toggleButton: {
    width: 100,
    margin: 10,
    backgroundColor: btnBackground,
    borderColor: btnBackground,
  }
});

export default Login;
