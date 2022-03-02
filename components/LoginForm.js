import React, {useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {PropTypes} from 'prop-types';

// Import from Ui Kitten Library
import {Text, Layout} from '@ui-kitten/components';

// Import app components
import FormInput from './formComponents/FormInput';
import {FormButton} from './elements/AppButton';
import ErrorMessage from './elements/ErrorMessage';

// Api import
import {login} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

// Styling import
import {colors} from '../utils';

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
      <Text
        category="h5"
        style={{
          top: Platform.OS === 'android' ? '-20%' : '-25%',
          textAlign: 'center',
          fontFamily: 'Karla_700Bold',
        }}
      >
        Welcome back
      </Text>
      <Text category="s1" style={styles.textWelcome}>
        Use your credentials below and login to your account
      </Text>
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
        style={{top: '-15%'}}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        text="Login"
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    alignSelf: 'center',
    width: 300,
  },
  layout: {
    marginTop: '35%',
    height: undefined,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  password: {
    marginTop: 5,
    marginBottom: 100,
    alignSelf: 'flex-end',
    fontFamily: 'Karla_700Bold',
  },
  textWelcome: {
    top: Platform.OS === 'android' ? '-15%' : '-20%',
    textAlign: 'center',
    fontFamily: 'Karla',
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: -20,
  },
});

LoginForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default LoginForm;
