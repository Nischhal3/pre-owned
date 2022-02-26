// import from React
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
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
// import {useMessage} from '../../hooks/MediaHooks';
import {getUserById} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';
import FormInput from '../formComponents/FormInput';
import {getToken} from '../../hooks/CommonFunction';
import ListDetail from './ListDetail';
import {colors} from '../../utils';
import DeleteAction from '../elements/DeleteAction';
import SVGIcon from '../../assets/icons/no-message.svg';
import {getMessagesByFileId, postMessage} from '../../hooks/MessageHook';

const MessageList = ({fileId, showMessages = false}) => {
  // const {postMessage, getMessagesByFileId} = useMessage(fileId, showMessages);

  const {user, updateMessage, setUpdateMessage} = useContext(MainContext);
  // const [senderName, setSenderName] = useState('');
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  // display messages from latest to oldest
  messages.sort((a, b) => a.timeAdded < b.timeAdded);

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
      for (const message of msgData) {
        const sender = await getUserById(message.user_id);
        message['username'] = sender.username;
      }
      setMessages(msgData);
    } catch (e) {
      console.error('get msg error', e.message);
    }
  };

  // Fetching message after deleting or adding new
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
      if (response) {
        setUpdateMessage(updateMessage + 1);
        Alert.alert('Success', 'Message Sent', [
          {
            text: 'OK',
            onPress: () => {
              reset();
            },
          },
        ]);
      }
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
      <Layout
        style={{height: 150, backgroundColor: colors.primary, marginBottom: 20}}
      >
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <FormInput
              style={styles.commentBox}
              // iconName="text-outline"
              name="Leave sender a message"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              textEntry={false}
              multiline={true}
              textStyle={{minHeight: 72}}
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
        <Button
          onPress={() => setVisible(true)}
          appearance="ghost"
          style={styles.messageBtn}
        >
          Total messages {messages.length}
        </Button>
      </Layout>
      <Modal
        style={{top: '10%'}}
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <AppButton
          appBtnStyle={styles.returnBtn}
          onPress={() => setVisible(false)}
          accessoryLeft={<Icon name="corner-up-left-outline" />}
        />
        <Card style={styles.messagesContainer}>
          <Text category="h5" style={styles.title}>
            All Messages
          </Text>
          {messages.length == 0 ? (
            <Layout style={styles.noMessageContainer}>
              <SVGIcon width="30" height="30" />
              <Text category="s1" style={styles.noMessageText}>
                No message to show
              </Text>
            </Layout>
          ) : (
            <List
              data={messages}
              contentContainerStyle={styles.container}
              horizontal={false}
              ItemSeparatorComponent={Divider}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <ListDetail
                  showMessages={true}
                  image={{uri: avatar}}
                  renderRightActions={() => (
                    <DeleteAction
                      message={item}
                      user={user}
                      setUpdateMessage={setUpdateMessage}
                      updateMessage={updateMessage}
                    />
                  )}
                  ItemSeparatorComponent={Divider}
                  message={item}
                  user={user}
                  setUpdateMessage={setUpdateMessage}
                  updateMessage={updateMessage}
                />
              )}
            />
          )}
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
    backgroundColor: colors.primary,
  },
  commentBox: {
    padding: 10,
    fontFamily: 'Karla',
    borderColor: colors.stroke,
  },
  sendBtn: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
    marginBottom: 15,
    right: 10,
  },
  messageBtn: {
    alignSelf: 'flex-start',
    marginTop: '-20%',
    marginBottom: 20,
    left: '-10%',
  },
  messagesContainer: {
    top: 0,
    // flex: 1,
    // width: 380,
    alignSelf: 'center',
    height: 700,
    backgroundColor: colors.container,
  },
  noMessageContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },
  noMessageText: {
    fontFamily: 'Karla',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
  },
  returnBtn: {
    zIndex: 1,
    width: 40,
    height: 10,
    position: 'absolute',
    marginTop: -10,
    alignSelf: 'flex-start',
  },

  title: {alignSelf: 'center', fontFamily: 'Karla_700Bold'},
});

MessageList.propTypes = {
  fileId: PropTypes.number,
  showMessages: PropTypes.bool,
};

export default MessageList;
