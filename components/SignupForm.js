import React, {useState} from 'react';
import {
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {PropTypes} from 'prop-types';

// Import from ui Kitten Library
import {
  Button,
  Text,
  Layout,
  CheckBox,
  Modal,
  Card,
} from '@ui-kitten/components';

// Api import
import {checkUserName, signUp} from '../hooks/ApiHooks';

// App component import
import FormInput from './formComponents/FormInput';
import {FormButton} from './elements/AppButton';
import ErrorMessage from './elements/ErrorMessage';

// Styling import
import {colors} from '../utils';

const SignupForm = ({setFormToggle}) => {
  // Terms checkbox
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={{flex: 1}}
    >
      <Layout style={styles.layout}>
        <Layout style={styles.textContainer}>
          <Text category="h5" style={styles.titleRegister}>
            Create account
          </Text>
          <Text category="s1" style={styles.textWelcome}>
            Find the stuffs in need or earn some extra income now
          </Text>
        </Layout>
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

        <ErrorMessage
          error={errors?.username}
          message={errors?.username?.message}
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            pattern: {
              value: /\S+@\S+\.\S+$/,
              message: 'Not valid email.',
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

        <ErrorMessage error={errors?.email} message={errors?.email?.message} />

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

        <ErrorMessage
          error={errors?.password}
          message={errors?.password?.message}
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
            <FormInput
              style={styles.confirmInput}
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

        <ErrorMessage
          error={errors?.confirmPassword}
          message={errors?.confirmPassword?.message}
        />

        <CheckBox
          style={styles.checkBox}
          checked={checked}
          onChange={(nextChecked) => setChecked(nextChecked)}
        >
          <Text style={styles.Terms} onPress={() => setVisible(true)}>
            I accept Terms and Condition
          </Text>
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
          >
            <Card style={styles.modal} disabled={true}>
              <ScrollView>
                <Text style={styles.text}>
                  This agreement is between you the [“User” or “you”] and
                  PreOwned [“we or us or our”] If you do not agree with all of
                  the provisions of this agreement, you cannot use the Services.
                </Text>
                <Text style={styles.text}>
                  To remove any doubt, in the event of any conflict or
                  discrepancy between these Terms and conditions and any other
                  provisions and/or terms and/or otherwise between PreOwned and
                  you, the provisions and the terms of these Terms of Use will
                  prevail. Please feel free to contact us with any questions
                  regarding the content of this agreement.
                </Text>
                <Text style={styles.text}>
                  - Seller: those who upload their second hand product on our
                  portal in order to sell it.
                </Text>
                <Text style={styles.text}>
                  - Buyers: those who visit the portal in order to consult and
                  buy certain second-hand products.
                </Text>
                <Text style={styles.text}>
                  Sellers and Buyers users will be identified in the rest of
                  this legal document with the word “User/s”. PreOwned reserves
                  the right to update the Terms and Conditions at any time
                  without notice to the user.
                </Text>
                <Text style={styles.text}>
                  This document represents the full and final agreement of the
                  parties regarding these Terms and Conditions. In particular,
                  it contains each and every legal and usage clause that the
                  user must comply with during the entire period of use of our
                  services.
                </Text>
                <Button
                  style={styles.dismissBtn}
                  onPress={() => setVisible(false)}
                >
                  DISMISS
                </Button>
              </ScrollView>
            </Card>
          </Modal>
        </CheckBox>

        <FormButton
          style={styles.button}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          disabled={!checked}
          text="Sign Up"
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.background,
  },
  button: {
    top: '-2%',
    bottom: 30,
  },
  confirmInput: {
    marginBottom: 0,
  },
  checkBox: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 10,
  },
  dismissBtn: {
    marginTop: 20,
    borderRadius: 15,
  },
  input: {
    marginBottom: 10,
  },
  modal: {
    margin: 10,
    borderRadius: 15,
    height: 700,
    marginVertical: '5%',
    backgroundColor: colors.primary,
  },
  layout: {
    marginTop: '15%',
    height: '100%',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    bottom: 20,
  },
  Terms: {
    textAlign: 'left',
    fontFamily: 'Karla_700Bold',
  },
  text: {
    lineHeight: 21,
    padding: 5,
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Karla',
  },
  textWelcome: {
    textAlign: 'center',
    fontFamily: 'Karla',
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: -30,
  },
  titleRegister: {
    textAlign: 'center',
    fontFamily: 'Karla_700Bold',
  },
  textContainer: {
    backgroundColor: 'transparent',
    marginTop: '10%',
    marginBottom: '12%',
  },
});

SignupForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default SignupForm;
