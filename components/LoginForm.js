import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Layout} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
import {login} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PropTypes} from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import FormInput from './formComponents/FormInput';
import {FormButton} from './elements/AppButton';
import colors from '../utils/colors';
import ErrorMessage from './elements/ErrorMessage';

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
          required: {value: true, message: 'This is required.'},
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

      <ErrorMessage
        error={errors?.username}
        message={errors?.username?.message}
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
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
      <ErrorMessage
        error={errors?.password}
        message={errors?.password?.message}
      />

      <Text style={styles.password}>Forgot password?</Text>
      <FormButton
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
    // justifyContent: 'space-around',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  input: {
    marginBottom: 10,
  },
  password: {
    marginTop: 5,
    marginBottom: 100,
    alignSelf: 'flex-end',
  },
});

LoginForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default LoginForm;
