import React from 'react';
import {Alert, View} from 'react-native';
import {Input, Button, Text} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
// import {useUser} from '../hooks/ApiHooks';
import {PropTypes} from 'prop-types';

const SignupForm = ({setFormToggle}) => {
  // const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   try {
  //     delete data.confirmPassword;
  //     const userData = await postUser(data);
  //     console.log('register onSubmit', userData);
  //     if (userData) {
  //       Alert.alert('Success', 'User created successfully.');
  //       setFormToggle(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View>
      {/* <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username has to be at least 3 characters.',
          },
          validate: async(value) => {
            try {
              const available = await checkUsername(value);
            if (available) {
              return true;
            } else {
              return 'Username is already taken.';
            }
            } catch(error) {
              console.error(error);
            }
          }
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      {errors.username && <Text>{error.username.errorMessage}</Text>}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            // value: '^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i',
            value: /\S+@\S+\.\S+$/,
            message: 'Has to be valid email.',
          }
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          minLength: {
            value: 5,
            message: 'Password has to have minLength of 5'
          }
          // pattern: {value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u, message: 'Min 8, Uppercase, Number'}
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          validate: (value) => {
            const {password} = getValues();
            if (value === password) {
              return true;
            } else {
              return 'Passwords do not match.';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm Password"
            errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          />
        )}
        name="confirmPassword"
      /> */}
      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)}>Sign Up</Button> */}
    </View>
  );
};

SignupForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default SignupForm;
