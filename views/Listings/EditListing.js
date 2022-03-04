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
  View,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

// Import from UI KItten Library
import {Card, Layout, Text} from '@ui-kitten/components';

// Import from files
import {getToken} from '../../hooks/CommonFunction';
import {putMedia} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';
import {uploadsUrl} from '../../utils/url';
import {colors} from '../../utils';
import {FormButton} from '../../components/elements/AppButton';
import ErrorMessage from '../../components/elements/ErrorMessage';
import FormInput from '../../components/formComponents/FormInput';

const EditListing = ({navigation, route}) => {
  const {file} = route.params;
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
    mode: 'onBlur',
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
      console.log('onSubmit edit post problem', e);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
    >
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <ScrollView>
          <View style={styles.boxShadow}>
            <Shadow>
              <Card style={styles.card}>
                <Text style={styles.cardTitle}>ProductDetail</Text>
                <Image
                  source={{uri: uploadsUrl + file.filename}}
                  style={styles.image}
                />
                <Layout style={styles.form}>
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
                        label="Title"
                        style={styles.input}
                        onBlur={onBlur}
                        onChange={onChange}
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
                      <FormInput
                        label="Description"
                        style={styles.input}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        autoCapitalize="none"
                        placeholder="Description"
                        multiline={true}
                        textStyle={{minHeight: 96}}
                        align="top"
                      />
                    )}
                    name="description"
                  />
                  <ErrorMessage
                    error={errors?.description}
                    message={errors?.description?.message}
                  />
                  <FormButton
                    style={styles.button}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    text="Save changes"
                  />
                </Layout>
              </Card>
            </Shadow>
          </View>
        </ScrollView>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  cardTitle: {
    textAlign: 'center',
    fontFamily: 'Karla_700Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: '55%',
    textAlign: 'center',
    marginTop: 25,
  },
  boxShadow: {
    marginTop: '10%',
    marginVertical: 15,
    marginHorizontal: 20,
    alignSelf: 'center',
    padding: 0,
  },
  card: {
    width: '100%',
    height: 650,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  image: {
    width: 250,
    height: undefined,
    alignSelf: 'center',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  form: {
    backgroundColor: colors.primary,
  },
  input: {
    marginTop: 10,
    width: '100%',
  },
});

EditListing.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditListing;
