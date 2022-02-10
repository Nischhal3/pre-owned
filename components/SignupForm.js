import React, {useState} from 'react';
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
import {useForm, Controller} from 'react-hook-form';
// import {useUser} from '../hooks/ApiHooks';
import {checkUserName, signUp} from '../hooks/ApiHooks';
import {PropTypes} from 'prop-types';
import FormInput from './formComponents/FormInput';
import {FormButton} from './elements/AppButton';
import colors from '../utils/colors';

const SignupForm = ({setFormToggle}) => {
  //for checkbox
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
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
    if (!checked) {
      Alert.alert('Please read Terms and Conditions');
      return;
    }
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
            // Error message not working ?
            // errorMessage={errors.email && errors.email.message}
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
        <Text status="danger">
          {errors.password && errors.password.message}{' '}
        </Text>
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
        <Text status="danger">
          {errors.confirmPassword && errors.confirmPassword.message}{' '}
        </Text>
      )}

      {/* <Input style={styles.input} accessoryLeft={<Icon name="person-outline"/>} placeholder="Username" /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="email-outline"/>} placeholder='Email' /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Password' /> */}
      {/* <Input style={styles.input} accessoryLeft={<Icon name="lock-outline"/>} placeholder='Confirm password' /> */}
      <CheckBox
        checked={checked}
        onChange={(nextChecked) => setChecked(nextChecked)}
      >
        <Button
          onPress={() => setVisible(true)}
          status="warning"
          style={{marginLeft: -110}}
          appearance="ghost"
        >
          I accept Terms and Condition
        </Button>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card style={styles.modal} disabled={true}>
            <Text style={styles.text}>
              This agreement is between you the [“User” or “you”] and PreOwned
              [“we or us or our”] If you do not agree with all of the provisions
              of this agreement, you cannot use the Services.
            </Text>
            <Text style={styles.text}>
              To remove any doubt, in the event of any conflict or discrepancy
              between these Terms and conditions and any other provisions and/or
              terms and/or otherwise between PreOwned and you, the provisions
              and the terms of these Terms of Use will prevail. Please feel free
              to contact us with any questions regarding the content of this
              agreement.
            </Text>
            <Text style={styles.text}>
              - Seller: those who upload their second hand product on our portal
              in order to sell it.
            </Text>
            <Text style={styles.text}>
              - Buyers: those who visit the portal in order to consult and buy
              certain second-hand products.
            </Text>
            <Text style={styles.text}>
              Sellers and Buyers users will be identified in the rest of this
              legal document with the word “User/s”. PreOwned reserves the right
              to update the Terms and Conditions at any time without notice to
              the user.
            </Text>
            <Text style={styles.text}>
              This document represents the full and final agreement of the
              parties regarding these Terms and Conditions. In particular, it
              contains each and every legal and usage clause that the user must
              comply with during the entire period of use of our services.
            </Text>
            <Button style={styles.dismissBtn} onPress={() => setVisible(false)}>
              DISMISS
            </Button>
          </Card>
        </Modal>
      </CheckBox>

      <FormButton
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        disabled={true}
        text="Sign Up"
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

SignupForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default SignupForm;
