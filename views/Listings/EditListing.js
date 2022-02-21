import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input, Text} from '@ui-kitten/components';
import {useMedia} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';
import {uploadsUrl} from '../../utils/url';
import {FormButton} from '../../components/elements/AppButton';
import colors from '../../utils/colors';
import ErrorMessage from '../../components/elements/ErrorMessage';

const EditListing = ({navigation, route}) => {
  const {file} = route.params;
  const {putMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const [image, setImage] = useState();
  const [type, setType] = useState('image');
  const [imageSelected, setImageSelected] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
  });

  // Submit Changes
  const onSubmit = async (data) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(data, token, file.file_id);
      console.log('edit post response', response);

      response &&
        Alert.alert('File', 'edited', [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(update + 1);
              navigation.navigate('My Listings');
            },
          },
        ]);
    } catch (e) {
      // let the user know the problem
      console.log('onSubmit edit post problem', e);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
    >
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Card
          style={{
            // flex: 2,
            width: '100%',
            top: 130,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ScrollView>
            <Image
              source={{uri: uploadsUrl + file.filename}}
              style={styles.image}
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
                <Input
                  label="Title"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Title"
                />
              )}
              name="title"
            />

            <ErrorMessage
              error={errors?.title}
              message={errors?.title?.message}
            />

            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This is required.'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Description"
                  // style={styles.input}
                  style={{
                    margin: 10,
                    width: 250,
                    marginBottom: 30,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Description"
                />
              )}
              name="description"
            />
            <ErrorMessage
              error={errors?.description}
              message={errors?.description?.message}
            />

            <FormButton
              // loading={loading}
              style={styles.button}
              size="medium"
              title="Save"
              // onPress={handleSubmit(onSubmit)}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              text="Save changes"
            />
          </ScrollView>
        </Card>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: 10,
    // marginTop: 25,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.container,
  },
  image: {
    width: '80%',
    height: undefined,
    alignSelf: 'center',
    aspectRatio: 1,
    marginBottom: 15,
  },
  input: {
    margin: 10,
    width: 250,
  },
});

EditListing.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditListing;
