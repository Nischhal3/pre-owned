import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, Button, Text, Layout, Icon, CheckBox} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {PropTypes} from 'prop-types';
import {primary} from '../utils/colors';

const SignupForm = ({setFormToggle}) => {
  //for checkbox
  const [checked, setChecked] = React.useState(false);

  //Api
  const {signupUser, checkUsername} = useUser();

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

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      const userData = await signupUser(data);
      if (userData) {
        Alert.alert('Success', 'User created successfully.');
        setFormToggle(true);
      }
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
            style={styles.input}
            accessoryLeft={<Icon name="person-outline"/>}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
            />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            value: /\S+@\S+\.\S+$/,
            message: 'Has to be valid email.',
          }
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            accessoryLeft={<Icon name="email-outline"/>}
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
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
            value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/,
            message: 'Minimum length of 8 with at least 1-Uppercase, 1-Lowercase and 1-Number'
          }
          // pattern: {value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u, message: 'Min 8, Uppercase, Number'}
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
            style={styles.input}
            accessoryLeft={<Icon name="lock-outline"/>}
            placeholder='Confirm password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            errorMessage={errors.confirmPassword && errors.confirmPassword.message}
            />
        )}
        name="confirmPassword"
      />


      {/* <Input style={styles.input} accessoryLeft={<Icon name="person-outline"/>} placeholder="Username" /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="email-outline"/>} placeholder='Email' /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Password' /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Confirm password' /> */}
      <CheckBox style={styles.input} checked={checked} onChange={nextChecked => setChecked(nextChecked)}> {`I accept all the Terms & Conditions`} </CheckBox>
      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>Sign Up</Button>
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
  button: {
    width: '50%',
    alignSelf: 'center',
  }
});

SignupForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default SignupForm;