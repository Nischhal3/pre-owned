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

const LoginForm = () => {
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
        <Text>Login</Text>
      </View>

      <Controller
        control={control}
        rules={{
          required: true,
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
      {errors.username && <Text>This is required!</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
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

      {errors.password && <Text>This is required!</Text>}
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

export default LoginForm;
