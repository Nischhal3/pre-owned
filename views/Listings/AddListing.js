import {
  Alert,
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useCallback, useContext, useState} from 'react';
import {Video} from 'expo-av';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import PropTypes from 'prop-types';

// Import from ui-kitten
import {Text, Icon, Layout, Card} from '@ui-kitten/components';

// Import for app components
import {AppButton, FormButton} from '../../components/elements/AppButton';
import {MainContext} from '../../contexts/MainContext';
import CategoryPicker from '../../components/CategoryPicker';
import FormInput from '../../components/formComponents/FormInput';

// Import default image
import uploadDefault from '../../assets/brand/upload.png';

// Styling imports
import colors from '../../utils/colors';
import {Shadow} from 'react-native-shadow-2';

// Api imports
import {appId} from '../../utils/url';
import {getToken} from '../../hooks/CommonFunction';
import {postMedia, postTag} from '../../hooks/MediaHooks';

const AddListing = ({navigation}) => {
  const uploadDefaultUri = Image.resolveAssetSource(uploadDefault).uri;
  const [image, setImage] = useState(uploadDefaultUri);
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('image');
  const {update, setUpdate, loading, setLoading} = useContext(MainContext);
  const [category, setCategory] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  // Selecting images
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const onSubmit = async (data) => {
    setImageSelected(false);
    setLoading(true);
    if (!imageSelected) {
      Alert.alert('Please select file');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();

    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });

    try {
      const token = await getToken();
      const response = await postMedia(formData, token);

      // Sending data to different category
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: `${appId}_${category}`},
        token
      );

      // All category in one database
      const allResponse = await postTag(
        {file_id: response.file_id, tag: `${appId}`},
        token
      );

      if (tagResponse && allResponse) {
        setLoading(false);
        Alert.alert('Success!', 'Post uploaded successfully.', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('Explore');
              setUpdate(update + 1);
            },
          },
        ]);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Fail to upload', `${error}`, [{text: 'Close'}]);
    }
  };

  // Resets the form
  const reset = () => {
    setImage(uploadDefaultUri);
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
    setType('image');
  };

  // Resets form user if off from this view
  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.boxShadow}>
            <Shadow distance={7}>
              <Card style={styles.card}>
                <Layout style={styles.selectImgWrap}>
                  <Text style={styles.selectImgText}>Select an image</Text>
                  <Icon
                    style={styles.icon}
                    fill={colors.mediumGrey}
                    name="arrowhead-down-outline"
                  />
                  {type === 'image' ? (
                    <>
                      <Layout style={styles.imgWrap}>
                        <TouchableOpacity onPress={pickImage}>
                          <Image source={{uri: image}} style={styles.image} />
                        </TouchableOpacity>
                      </Layout>
                    </>
                  ) : (
                    <Video
                      source={{uri: image}}
                      style={styles.image}
                      useNativeControls={true}
                      resizeMode="cover"
                      onError={(err) => {
                        console.error('video', err);
                      }}
                    />
                  )}
                </Layout>
                <AppButton
                  appBtnStyle={styles.clearBtn}
                  onPress={reset}
                  accessoryLeft={<Icon name="refresh-outline" />}
                />
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'This field cannot be empty.',
                    },
                    minLength: {
                      value: 3,
                      message: 'Title has to be at least 3 characters.',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Title has to be at most 20 characters.',
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <FormInput
                      style={styles.title}
                      name="What's your product?"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      textEntry={false}
                    />
                  )}
                  name="title"
                />
                {errors.title && (
                  <Text status="danger">
                    {errors.title && errors.title.message}{' '}
                  </Text>
                )}

                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please specify your product with a price.',
                    },
                    minLength: {
                      value: 5,
                      message: 'Description has to be at least 10 characters.',
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <FormInput
                      style={styles.description}
                      name="Describe your product and give it a price."
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      textEntry={false}
                      multiline={true}
                      textStyle={{minHeight: 96}}
                      align="top"
                    />
                  )}
                  name="description"
                />

                {errors.description && (
                  <Text status="danger">
                    {errors.description && errors.description.message}{' '}
                  </Text>
                )}

                <CategoryPicker setCategory={setCategory} />

                <FormButton
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  loading={loading}
                  disabled={!imageSelected}
                  style={styles.uploadBtn}
                  text="Upload"
                />
              </Card>
            </Shadow>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxShadow: {
    marginTop: Platform.OS === 'android' ? '5%' : '15%',
    marginVertical: 15,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  card: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: colors.primary,
    margin: 0,
    width: 350,
  },
  selectImgWrap: {
    height: 250,
    width: '100%',
    marginBottom: 15,
    backgroundColor: colors.primary,
  },
  selectImgText: {
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Karla_700Bold',
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  imgWrap: {
    marginTop: 10,
    height: 200,
    backgroundColor: colors.primary,
  },
  image: {
    zIndex: 2,
    width: null,
    height: '100%',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  clearBtn: {
    zIndex: 1,
    width: 40,
    height: 10,
    position: 'absolute',
    top: '1%',
    right: '-1%',
    alignSelf: 'flex-end',
  },
  title: {
    marginTop: 15,
  },
  description: {
    marginTop: 10,
  },
  uploadBtn: {
    width: '50%',
    marginTop: 25,
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AddListing.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddListing;
