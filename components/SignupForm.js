import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Text, Layout, CheckBox} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
// import {useUser} from '../hooks/ApiHooks';
import {checkUserName, signUp} from '../hooks/ApiHooks';
import {PropTypes} from 'prop-types';
import {primary} from '../utils/colors';
import FormInput from './formComponents/FormInput';
import FormButton from './formComponents/FormButton';

const SignupForm = ({setFormToggle}) => {
  //for checkbox
  const [checked, setChecked] = React.useState(false);
  //Api
  // const {signupUser, checkUsername} = useUser();

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
      const userData = await signUp(data);
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
          validate: async (value) => {
            try {
              const available = await checkUserName(value);
              if (available) {
                return true;
              } else {
                return 'Username is already taken.';
              }
            } catch (error) {
              console.error(error);
            }
          },
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

      {errors.username && (
        <Text>{errors.username && errors.username.message} </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            value: /\S+@\S+\.\S+$/,
            message: 'Has to be valid email.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <FormInput
            style={styles.input}
            iconName="email-outline"
            name="Email"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            textEntry={false}
            // Error message not working ?
            // errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      {errors.email && <Text>{errors.email && errors.email.message} </Text>}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          pattern: {
            /**
             *  Password criteria
             *  Minimum length 8 , atlease 1 digit
             *  Atleast 1 upper case of lower case character
             */
            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            message: 'Min 8, Uppercase & Number',
          },
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

      {errors.password && (
        <Text>{errors.password && errors.password.message} </Text>
      )}

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
          <FormInput
            style={styles.input}
            iconName="lock-outline"
            name="Confirm password"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            textEntry={true}
          />
        )}
        name="confirmPassword"
      />

      {errors.confirmPassword && (
        <Text>{errors.confirmPassword && errors.confirmPassword.message} </Text>
      )}

      {/* <Input style={styles.input} accessoryLeft={<Icon name="person-outline"/>} placeholder="Username" /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="email-outline"/>} placeholder='Email' /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Password' /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Confirm password' /> */}
      <CheckBox
        style={styles.input}
        checked={checked}
        onChange={(nextChecked) => setChecked(nextChecked)}
      >
        {' '}
        {`I accept all the Terms & Conditions`}{' '}
      </CheckBox>
      <FormButton
        btnStyle={styles.button}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        text="Sign Up"
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
  button: {
    width: '50%',
    alignSelf: 'center',
  },
});

SignupForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default SignupForm;
