import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Layout} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
import {login} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PropTypes} from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {primary} from '../utils/colors';
import FormInput from './formComponents/FormInput';
import FormButton from './formComponents/FormButton';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
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
      const userData = await login(data);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData.user);
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
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <FormInput
            style={styles.input}
            iconName="person-outline"
            name="Username"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            textEntry={false}
          />
        )}
        name="username"
      />
      {errors.username && <Text status="danger">This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <FormInput
            style={styles.input}
            iconName="lock-outline"
            name="Password"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            textEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text status="danger">This is required.</Text>}

      <Text style={styles.password}>Forgot password?</Text>
      <FormButton
        btnStyle={styles.button}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        text="Login"
      />
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
  },
});

LoginForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default LoginForm;
