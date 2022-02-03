import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import {Input, Button, Text, Layout, Icon, CheckBox} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
import {useLogin} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PropTypes} from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {primary} from '../utils/colors';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // const userData = await login(data);
      // await AsyncStorage.setItem('userToken', userData.token);
      // setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout style={styles.layout}>
      <Controller
        control={control}
        rules={{
          // required: {value: true, message: 'Username cannot be empty.'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            accessoryLeft={<Icon name="person-outline"/>}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          // required: {value: true, message: 'Password cannot be empty.'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            accessoryLeft={<Icon name="lock-outline"/>}
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Text style={styles.password}>Forgot password?</Text>
      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>Login</Button>
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
