// Import from React
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Alert, SafeAreaView, View} from 'react-native';
import {PropTypes} from 'prop-types';

// Import from UI Kitten Library
import {Text, Layout, Avatar} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';

// Import from files
import FormInput from '../components/formComponents/FormInput';
import {FormButton} from '../components/elements/AppButton';
import colors from '../utils/colors';
import {checkUserName, updateUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {getToken} from '../hooks/CommonFunction';
import {uploadsUrl} from '../utils/url';
import {getFilesByTag} from '../hooks/MediaHooks';
import {Shadow} from 'react-native-shadow-2';

const EditProfile = ({navigation}) => {
  const {user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState();
  const [hasAvatar, setHasAvatar] = useState(false);

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
      full_name: user.full_name,
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

      // console.log("edit data", data);
      // console.log('Data', response);

      if (response) {
        delete data.password;
        setUser(data);
        Alert.alert('Profile Details', 'Updated successfully.', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('Profile');
              console.log('after edit', user);
            },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAvatar = async () => {
    console.log('edit avatar user', user);
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      if (avatar != null) {
        setHasAvatar(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateAvatar = async (mediaId) => {
    const data = {
      file_id: mediaId,
      tag: 'avatar_' + user.user_id,
    };
    try {
      const result = await postTag(
        data,
        'correct token should be here to use this'
      );
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
    // updateAvatar();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{
          marginVertical: 15,
          justifyContent: 'center',
          alignItems: 'center',
          top: '10%',
        }}
      >
        <Shadow>
          <Layout style={styles.layout}>
            {hasAvatar ? (
              <Avatar
                style={styles.avatar}
                source={{uri: avatar}}
                shape="round"
              />
            ) : (
              <Avatar
                style={styles.avatar}
                source={require('../assets/backgrounds/Avatar.png')}
                shape="round"
              />
            )}
            <Layout style={styles.form}>
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
                <Text status="danger">
                  {errors.email && errors.email.message}{' '}
                </Text>
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

              <Controller
                control={control}
                // rules={{
                //   required: {value: true, message: 'This is required.'},
                //   pattern: {
                //     value: /\S+@\S+\.\S+$/,
                //     message: 'Description',
                //   },
                // }}
                render={({field: {onChange, onBlur, value}}) => (
                  <FormInput
                    style={styles.input}
                    iconName="edit-2-outline"
                    name="Description"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    textEntry={false}
                  />
                )}
                name="full_name"
              />

              <FormButton
                style={styles.button}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                text="Save"
              />
            </Layout>
          </Layout>
        </Shadow>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: colors.primary,
    width: 350,
    paddingBottom: 30,
    alignSelf: 'center',
    borderRadius: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  form: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

EditProfile.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfile;
