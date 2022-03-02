// Import from React
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  View,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import {getFilesByTag, postMedia, postTag} from '../hooks/MediaHooks';
import {Shadow} from 'react-native-shadow-2';
import {GlobalStyles} from '../utils';
import assetAvatar from '../assets/backgrounds/Avatar.png';
import * as ImagePicker from 'expo-image-picker';
import {Card} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';

const EditProfile = ({navigation}) => {
  const uploadDefaultUri = Image.resolveAssetSource(assetAvatar).uri;
  const {user, setUser, loading, setLoading, updateAvatar, setUpdateAvatar} =
    useContext(MainContext);
  const [avatar, setAvatar] = useState(uploadDefaultUri);
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('image');
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const onSubmit = async (data) => {
    setImageSelected(false);
    setLoading(true);
    try {
      delete data.confirmPassword;

      if (data.password === '') {
        delete data.password;
      }

      const filename = avatar.split('/').pop();
      let fileExtension = filename.split('.').pop();
      fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

      const formData = new FormData();

      formData.append('file', {
        uri: avatar,
        name: filename,
        type: type + '/' + fileExtension,
      });

      const userToken = await getToken();
      const response = await updateUser(data, userToken);

      const avatarResponse = await postMedia(formData, userToken);
      const tagResponse = await postTag(
        {
          file_id: avatarResponse.file_id,
          tag: `pre_owned_avatar_${user.user_id}`,
        },
        userToken
      );

      if (response && tagResponse) {
        delete data.password;
        setUser(data);
        setLoading(false);
        setUpdateAvatar(updateAvatar + 1);
        Alert.alert('Profile Details', 'Updated successfully.', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('Profile');
              setAvatar(uploadDefaultUri);
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Edit profile', error);
      setLoading(false);
      setAvatar(uploadDefaultUri);
    }
  };

  const reset = () => {
    setAvatar(uploadDefaultUri);
    setImageSelected(false);
    setValue('username', user.username);
    setValue('email', user.email);
    setValue('password', '');
    setValue('confirmPassword', '');
    setValue('full_name', user.full_name);
  };

  // Resets form user if off from this view
  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  return (
    <SafeAreaView style={[GlobalStyles.AndroidSafeArea, styles.safeView]}>
      <ScrollView>
        <View style={styles.boxShadow}>
          <Shadow>
            <Layout style={styles.layout}>
              <TouchableOpacity onPress={pickImage}>
                <Avatar
                  style={styles.avatar}
                  source={{uri: avatar}}
                  shape="round"
                />
              </TouchableOpacity>
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
                  text={
                    loading ? (
                      <ActivityIndicator
                        animating={loading}
                        color={colors.text_light}
                        size="large"
                      />
                    ) : (
                      'Save'
                    )
                  }
                  disabled={!imageSelected}
                />
              </Layout>
            </Layout>
          </Shadow>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  boxShadow: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    top: Platform.OS === 'ios' ? '5%' : 0,
  },
  button: {
    marginTop: 20,
  },
  form: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderRadius: 4,
    // borderColor: 'transparent',
    backgroundColor: colors.container,
  },
  layout: {
    backgroundColor: colors.primary,
    width: 350,
    paddingBottom: 30,
    alignSelf: 'center',
    borderRadius: 15,
  },
  safeView: {
    backgroundColor: colors.background,
  },
});

EditProfile.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfile;
