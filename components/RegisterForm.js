import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {signUp} from './hooks/ApiHooks';

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await signUp(data);
      console.log('Data', response);

      if (response) {
        Alert.alert('User created successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{margin: 40}}>
      <View style={{alignItems: 'center'}}>
        <Text>Register</Text>
      </View>

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          minLength: {
            value: 3,
            message: 'Username has to be atleast 3 characters',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{borderWidth: 1, margin: 5}}
            autoCapitalize="none"
            placeholder="Username"
          />
        )}
        name="username"
      />
      {errors.username && <Text>{errors.username.message} </Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{borderWidth: 1, margin: 5}}
            autoCapitalize="words"
            placeholder="Full name"
          />
        )}
        name="full_name"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: {
            value:
              /^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/,
            message: 'Invalid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{borderWidth: 1, margin: 5}}
            autoCapitalize="none"
            placeholder="email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: {
            /**
             *  Password criteria
             *  Minimum length 8 , atlease 1 digit
             *  Atleast 1 upper case of lower case character
             */
            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            message: 'Min-8, 1-Uppercase,1-Lowercase,1-Number ',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{borderWidth: 1, margin: 5}}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
          />
        )}
        name="password"
      />

      {errors.password && <Text>{errors.password.message}</Text>}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#5c7aff',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  containerStyle: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 2,
  },
  inputStyle: {
    marginBottom: 2,
    padding: 5,
    borderEndWidth: 1,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
});

export default RegisterForm;
