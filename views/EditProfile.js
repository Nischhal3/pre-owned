// Import from React
import React, {useCallback, useContext, useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Import from UI Kitten Library
import {Text, Layout, Avatar, Icon} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';

// Import from files
import FormInput from '../components/formComponents/FormInput';
import {AppButton, FormButton} from '../components/elements/AppButton';
import colors from '../utils/colors';
import {checkUserName, updateUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {getToken} from '../hooks/CommonFunction';
import {postMedia, postTag} from '../hooks/MediaHooks';
import {Shadow} from 'react-native-shadow-2';
import {GlobalStyles} from '../utils';
import assetAvatar from '../assets/backgrounds/Avatar.png';
import * as ImagePicker from 'expo-image-picker';
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

      data.user_id = user.user_id;

      const filename = avatar.split('/').pop();
      let fileExtension = filename.split('.').pop();
      fileExtension === 'jpg' ? 'jpeg' : fileExtension;

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
              setImageSelected(true);
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
    setImageSelected(true);
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
      <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.boxShadow}>
            <Shadow>
              <Layout style={styles.layout}>
                <TouchableOpacity onPress={pickImage}>
                  {!imageSelected ? (
                    <AppButton
                      appBtnStyle={styles.editBtn}
                      onPress={pickImage}
                      accessoryLeft={
                        <Icon name="camera-outline" fill={colors.mediumGrey} />
                      }
                    />
                  ) : null}

                  <Avatar
                    style={styles.avatar}
                    source={{uri: avatar}}
                    shape="round"
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: '2%',
                      fontSize: 14,
                      fontFamily: 'Karla',
                      color: colors.text_dark,
                    }}
                  >
                    Change profile picture
                  </Text>
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
      </KeyboardAwareScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Platform.OS === 'ios' ? '15%' : '10%',
  },
  button: {
    marginTop: 20,
  },
  editBtn: {
    zIndex: 1,
    position: 'absolute',
    marginTop: '20%',
    marginLeft: '50%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  form: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  input: {
    marginBottom: 10,
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
