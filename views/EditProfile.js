import React, {useContext, useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Input,
  Button,
  Text,
  Layout,
  Icon,
  CheckBox,
  Modal,
  Card,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {PropTypes} from 'prop-types';
import FormInput from '../components/formComponents/FormInput';
import {FormButton} from '../components/elements/AppButton';
import colors from '../utils/colors';
import {checkUserName, updateUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {getToken} from '../hooks/CommonFunction';
import ErrorMessage from '../components/elements/ErrorMessage';

const EditProfile = ({navigation}) => {
  const {user, setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;

      if (data.password === '') {
        delete data.password;
      }
      const userToken = await getToken();
      const response = await updateUser(data, userToken);

      console.log(data);
      console.log('Data', response);
      if (response) {
        delete data.password;
        setUser(data);
        Alert.alert('File', 'uploaded', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('Profile');
            },
          },
        ]);
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
              if (available || user.username === value) {
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
      {/* Need to ask teacher: Not working */}
      {/* {<ErrorMessage field={errors.username} text={errors.username.message} />} */}

      {errors.username && (
        <Text status="danger">
          {errors.username && errors.username.message}{' '}
        </Text>
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
          />
        )}
        name="email"
      />

      {errors.email && (
        <Text status="danger">{errors.email && errors.email.message} </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: {value: false, message: 'This is required'},
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
        <Text status="danger">
          {errors.password && errors.password.message}{' '}
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: {value: false, message: 'This is required'},
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
        <Text status="danger">
          {errors.confirmPassword && errors.confirmPassword.message}{' '}
        </Text>
      )}

      <FormButton
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        disabled={true}
        text="Update"
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    height: 350,
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  backdrop: {
    backgroundColor: colors.primary,
  },
  dismissBtn: {marginTop: 20, borderRadius: 15},
  input: {
    // margin: 10,
  },
  modal: {
    margin: 10,
    borderRadius: 15,
  },
  text: {
    lineHeight: 21,
    padding: 5,
    fontWeight: '500',
    fontSize: 14,
  },
});

EditProfile.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfile;
