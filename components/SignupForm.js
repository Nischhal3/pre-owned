import React from 'react';
import { StyleSheet } from 'react-native';
import {Input, Button, Text, Layout, Icon, CheckBox} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
// import {useUser} from '../hooks/ApiHooks';
import {PropTypes} from 'prop-types';
import {primary} from '../utils/colors';

const SignupForm = () => {

  const [checked, setChecked] = React.useState(false);

  return (
    <Layout style={styles.layout}>
      <Input style={styles.input} accessoryLeft={<Icon name="person-outline"/>} placeholder="Username" />
      <Input style={styles.input} accessoryLeft={<Icon name="email-outline"/>} placeholder='Email' />
      <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Password' />
      <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Confirm password' />
      <CheckBox style={styles.input} checked={checked} onChange={nextChecked => setChecked(nextChecked)}> {`I accept all the Terms & Conditions`} </CheckBox>
      <Button style={styles.button} title="Submit">Sign Up</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: primary,
    borderColor: primary,
  },
  input: {
    margin: 10,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
  }
});

SignupForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default SignupForm;
