import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Video} from 'expo-av';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {Card} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import PropTypes from 'prop-types';

import {Text, Icon} from '@ui-kitten/components';

import {AppButton, FormButton} from '../../components/elements/AppButton';
import {MainContext} from '../../contexts/MainContext';
import uploadDefault from '../../assets/brand/upload.png';
import CategoryPicker from '../../components/CategoryPicker';
import FormInput from '../../components/formComponents/FormInput';
import colors from '../../utils/colors';
import {appId} from '../../utils/url';
import {addMediaItem, getToken} from '../../hooks/CommonFunction';
import {getFilesByTag, postMedia, postTag} from '../../hooks/MediaHooks';

const AddListing = ({navigation}) => {
  // const [image, setImage] = useState(
  //   'https://place-hold.it/300x200&text=Choose'
  // );
  const uploadDefaultUri = Image.resolveAssetSource(uploadDefault).uri;
  const [image, setImage] = useState(uploadDefaultUri);
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('image');
  const {update, setUpdate, loading, setLoading} = useContext(MainContext);
  const [category, setCategory] = useState('');

  // Category items
  const [home, setHome] = useState([]);
  const [electronics, setElectornics] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [sports, setSports] = useState([]);
  const [gaming, setGaming] = useState([]);
  const [others, setOthers] = useState([]);

  const homeTag = `${appId}_Home & Living`;
  const electronicsTag = `${appId}_Electronics`;
  const clothingTag = `${appId}_Clothing`;
  const sportsTag = `${appId}_Sports`;
  const gamingTag = `${appId}_Gaming & Accessories`;
  const othersTag = `${appId}_Others`;

  const [mediaArray, setMediaArray] = useState([]);
  // const mediaArray = [];

  const getCategoryItems = async () => {
    const homeMedia = await getFilesByTag(homeTag);
    const electronicsMedia = await getFilesByTag(electronicsTag);
    const clothingMedia = await getFilesByTag(clothingTag);
    const sportsMedia = await getFilesByTag(sportsTag);
    const gamingMedia = await getFilesByTag(gamingTag);
    const othersMedia = await getFilesByTag(othersTag);

    // Adding media files to their respective category
    setHome(homeMedia);
    setElectornics(electronicsMedia);
    setClothing(clothingMedia);
    setSports(sportsMedia);
    setGaming(gamingMedia);
    setOthers(othersMedia);

    // Adding all category items to single array
    setMediaArray([
      ...homeMedia,
      ...electronicsMedia,
      ...clothingMedia,
      ...sportsMedia,
      ...gamingMedia,
      ...othersMedia,
    ]);
  };

  console.log('Media', mediaArray.length);

  useEffect(() => {
    getCategoryItems();
  }, [update]);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    // console.log('Picke image', result);
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
    // console.log('Extension', fileExtension);

    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });
    // console.log('formData', formData);

    try {
      const token = await getToken();
      const response = await postMedia(formData, token);
      // console.log('Media upload', response);

      const tagResponse = await postTag(
        {file_id: response.file_id, tag: `${appId}_${category}`},
        token
      );
      // console.log('upload response', tagResponse);

      if (tagResponse) {
        setLoading(false);
        Alert.alert('Success!', 'Post uploaded successfully.', [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(update + 1);
              navigation.navigate('Explore');
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
    <ScrollView>
      <Card style={styles.card}>
        {type === 'image' ? (
          <Card.Image
            source={{uri: image}}
            style={styles.image}
            onPress={pickImage}
          />
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
        <AppButton
          // title="Clear list"
          appBtnStyle={styles.clearBtn}
          onPress={reset}
          accessoryLeft={<Icon name="refresh-outline" />}
          // appearance="ghost"
        />
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
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
              style={styles.inputStyle}
              iconName="text-outline"
              name="Title"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              textEntry={false}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text status="danger">{errors.title && errors.title.message} </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            minLength: {
              value: 5,
              message: 'Description has to be at least 10 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <FormInput
              style={styles.inputStyle}
              iconName="text-outline"
              name="Descripe your product and give it a price"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              textEntry={false}
              multiline={true}
              textStyle={{minHeight: 96}}
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
          // text="Upload"
          text={
            loading ? (
              <ActivityIndicator
                animating={loading}
                color={colors.text_light}
                size="large"
              />
            ) : (
              'Upload'
            )
          }
          disabled={!imageSelected}
          style={styles.uploadBtn}
        />
        {/* <ActivityIndicator animating={loading} color="#6B818C" size="large" /> */}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    top: 50,
  },
  image: {
    zIndex: 2,
    width: '100%',
    height: 250,
    aspectRatio: 1,
    marginBottom: 20,
  },
  clearBtn: {
    zIndex: 1,
    width: 40,
    height: 10,
    position: 'absolute',
    marginTop: -10,
    alignSelf: 'flex-end',
  },
  inputStyle: {
    marginBottom: 10,
  },
  uploadBtn: {
    marginTop: 25,
    textAlignVertical: 'center',
  },
});
AddListing.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default AddListing;
