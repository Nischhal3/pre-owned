import {View, Alert, StyleSheet} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native';

import {AppButton} from '../elements/AppButton';
import {useMessage} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';
import colors from '../../utils/colors';
import FormInput from './FormInput';
import {getToken} from '../../hooks/CommonFunction';

const MessageForm = ({fileId}) => {
  const {postMessage} = useMessage(fileId);
  const {updateMessage, setUpdateMessage} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      message: '',
    },
    mode: 'onBlur',
  });

  const reset = () => {
    setValue('message', '');
  };

  // send Message
  const sendMessage = async (message) => {
    try {
      // const token = getToken();

      const token = await AsyncStorage.getItem('userToken');
      const response = await postMessage(
        {file_id: fileId, message: message.message},
        token
      );
      response &&
        Alert.alert('Success', 'Message Sent', [
          {
            text: 'OK',
            onPress: () => {
              reset();
              setUpdateMessage(updateMessage + 1);
            },
          },
        ]);
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <FormInput
            style={styles.commentBox}
            iconName="text-outline"
            name="Add Message"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            textEntry={false}
          />
        )}
        name="message"
      />
      {errors.message && (
        <Text status="danger">{errors.message && errors.message.message} </Text>
      )}
      <AppButton style={styles.sendBtn} title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    padding: 10,
    borderColor: colors.stroke,
  },
  sendBtn: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
    marginBottom: 30,
    fontWeight: '500',
    fontFamily: 'Karla_700Bold',
  },
});

export default MessageForm;
