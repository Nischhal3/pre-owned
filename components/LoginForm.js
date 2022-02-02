import React from 'react';
import { StyleSheet } from 'react-native';
import {Input, Button, Text, Layout, Icon, CheckBox} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
// import {useUser} from '../hooks/ApiHooks';
import {PropTypes} from 'prop-types';
import {primary} from '../utils/colors';

const LoginForm = () => {

  return (
    <Layout style={styles.layout}>
      <Input style={styles.input} accessoryLeft={<Icon name="person-outline"/>} placeholder="Username" />
      <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Password' />
      <Text style={styles.password}>Forgot password?</Text>
      <Button style={styles.button} title="Submit">Login</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    height: 350,
    justifyContent: 'space-around',
    backgroundColor: primary,
    borderColor: primary,
  },
  input: {
    // margin: 10,
  },
  password: {
    marginBottom: 100,
    alignSelf: 'flex-end',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
  }
});

LoginForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default LoginForm;
