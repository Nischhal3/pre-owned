// import from React
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';

// Import from UI Kitten Library
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  Modal,
  Text,
} from '@ui-kitten/components';

// Import from files
import {AppButton, FormButton} from '../elements/AppButton';
import {useMessage} from '../../hooks/MediaHooks';
import {getUserById} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';
import FormInput from '../formComponents/FormInput';
import {getLocalTime, getToken} from '../../hooks/CommonFunction';
import ListDetail from './ListDetail';
import {colors} from '../../utils';
import DeleteAction from '../elements/DeleteAction';

const MessageList = ({fileId, showMessages = false}) => {
  const {deleteMessage, postMessage, getMessagesByFileId} = useMessage(
    fileId,
    showMessages
  );

  const {updateMessage, setUpdateMessage, update, setUpdate} =
    useContext(MainContext);
  // const [senderName, setSenderName] = useState('');
  const [visible, setVisible] = useState(false);
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
  // function delete a message
  const handleDelete = () => {
    Alert.alert('Delete Message', 'Confirm delete action?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async (data) => {
          try {
            const token = await getToken();
            const response = await deleteMessage(data.comment_id, token);
            console.log(response);
            // update the list after deletion
            response && setUpdate(update + 1);
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };
  // get msg
  const fetchMessage = async () => {
    try {
      const msgData = await getMessagesByFileId(fileId);
      for (const message of msgData) {
        const sender = await getUserById(message.user_id);
        message['username'] = sender.username;
      }
      setMessages(msgData);
    } catch (e) {
      console.error('get msg error', e.message);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [messages]);
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
    <Layout style={styles.container}>
      <Layout style={{height: 150}}>
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
              multiline={true}
              textStyle={{minHeight: 96}}
            />
          )}
          name="message"
        />
        {errors.message && (
          <Text status="danger">
            {errors.message && errors.message.message}{' '}
          </Text>
        )}
        <FormButton
          style={styles.sendBtn}
          text="Send"
          handleSubmit={handleSubmit}
          onSubmit={sendMessage}
        />
      </Layout>
      <Button onPress={() => setVisible(true)} appearance="ghost">
        Total messages {messages.length}
      </Button>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <AppButton
          appBtnStyle={styles.clearBtn}
          onPress={() => setVisible(false)}
          accessoryLeft={<Icon name="close-outline" />}
        />
        <Card style={{height: 600, backgroundColor: colors.container}}>
          <List
            data={messages}
            contentContainerStyle={styles.container}
            horizontal={false}
            ItemSeparatorComponent={Divider}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ListDetail
                description={item.comment}
                title={item.username}
                timeAdded={convertToLocalTime(item.time_added)}
                image={{uri: avatar}}
                renderRightActions={() => (
                  <DeleteAction onPress={handleDelete} />
                )}
                ItemSeparatorComponent={Divider}
              />
            )}
          />
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.primary,
  },
  container: {
    fontSize: 16,
    fontFamily: 'Karla_700Bold',
  },
  commentBox: {
    padding: 10,
    borderColor: colors.stroke,
  },
  clearBtn: {
    zIndex: 1,
    width: 40,
    height: 10,
    position: 'absolute',
    marginTop: -10,
    alignSelf: 'flex-end',
  },
  dismissBtn: {
    zIndex: 1,
    position: 'absolute',
    right: 20,
  },
  modal: {
    height: 500,
    margin: 10,
    borderRadius: 15,
  },
  sendBtn: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
    margin: 15,
  },
});

// MessageList.propTypes = {
//   fileId: PropTypes.object,
//   showMessages: PropTypes.bool,
// };

export default MessageList;
