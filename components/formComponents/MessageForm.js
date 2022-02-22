// import from React
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';

// Import from UI Kitten Library
import {Divider, List, Text} from '@ui-kitten/components';

// Import from files
import {FormButton} from '../elements/AppButton';
import {useMessage} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';
import colors from '../../utils/colors';
import FormInput from './FormInput';
import {getLocalTime, getToken} from '../../hooks/CommonFunction';
import ListDetail from '../lists/ListDetail';

const MessageForm = ({fileId, showMessages = false}) => {
  const {postMessage, getMessagesByFileId} = useMessage(fileId, showMessages);
  const {updateMessage, setUpdateMessage, user} = useContext(MainContext);
  const [messages, setMessages] = useState([]);
  const {convertToLocalTime} = getLocalTime();
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

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

  // get msg
  const fetchMessage = async () => {
    try {
      const msgData = await getMessagesByFileId(fileId);
      setMessages(msgData);
      console.log(msgData);
    } catch (e) {
      console.error('get msg error', e.message);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [updateMessage]);
  // send Message
  const sendMessage = async (data) => {
    try {
      const token = await getToken();
      const response = await postMessage(
        {file_id: fileId, comment: data.message},
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
      <FormButton
        style={styles.sendBtn}
        text="Send"
        handleSubmit={handleSubmit}
        onSubmit={sendMessage}
      />
      <List
        data={messages}
        contentContainerStyle={styles.container}
        horizontal={false}
        ItemSeparatorComponent={Divider}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ListDetail
            description={item.comment}
            title={user.username}
            timeAdded={convertToLocalTime(item.time_added)}
            image={{uri: avatar}}
            showMessages={true}
          />
        )}
      />
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
    margin: 15,
  },
});

MessageForm.propTypes = {
  fileId: PropTypes.object,
  showMessages: PropTypes.bool,
};

export default MessageForm;
