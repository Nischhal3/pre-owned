// Import from React
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
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

// Import from UI KItten Library
import {Card, Input} from '@ui-kitten/components';

// Import from files
import {getToken} from '../../hooks/CommonFunction';
import {useMedia} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';
import {uploadsUrl} from '../../utils/url';
import colors from '../../utils/colors';
import {FormButton} from '../../components/elements/AppButton';
import ErrorMessage from '../../components/elements/ErrorMessage';

const EditListing = ({navigation, route}) => {
  const {file} = route.params;
  const {putMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

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
      const token = await getToken();
      const response = await putMedia(data, token, file.file_id);
      console.log('edit post response', response);

      response &&
        Alert.alert('Updated', 'Post updated succesfully', [
          {
            text: 'OK',
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
        <Card style={styles.card}>
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
              size="medium"
              style={styles.button}
              title="Save"
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
  button: {marginTop: 20},
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  card: {
    top: '10%',
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.container,
  },
  image: {
    width: 250,
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
