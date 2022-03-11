// import from React
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View, Dimensions} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';

// Import from UI Kitten Library
import {
  Button,
  Card,
  Icon,
  Layout,
  List,
  Modal,
  Text,
} from '@ui-kitten/components';

// Import Shadow
import {Shadow} from 'react-native-shadow-2';

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
import {MessageSeparator} from '../elements/ItemSeparator';
import SVGIcon from '../../assets/icons/no-message.svg';
import {getMessagesByFileId, postMessage} from '../../hooks/MessageHook';

// Import screen orientation
import screenOrientation from '../../components/screenOrientation';

const MessageList = ({fileId}) => {
  const {user, updateMessage, setUpdateMessage} = useContext(MainContext);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  // Screen orientation
  const [orientation, setOrientation] = useState(
    screenOrientation.isPortrait() ? 'portrait' : 'landscape'
  );

  // display messages from latest to oldest
  messages.sort((a, b) => a.time_added < b.time_added);
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

  // Fetching message from database
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
    Dimensions.addEventListener('change', () => {
      setOrientation(screenOrientation.isPortrait() ? 'portrait' : 'landscape');
    });
  }, [updateMessage]);

  // Sending Messageto database
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
      console.error(e);
    }
  };

  // Resets the text filed
  const reset = () => {
    setValue('message', '');
  };

  // Reseting message text field after message is sent
  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  if (orientation === 'portrait') {
    return (
      <Layout style={styles.container}>
        <Layout
          style={{
            height: 150,
            backgroundColor: colors.primary,
            marginBottom: 20,
          }}
        >
          <Controller
            control={control}
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
                align="top"
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
            View messages
          </Button>
        </Layout>
        <Modal
          style={styles.modal}
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <AppButton
            appBtnStyle={styles.returnBtn}
            onPress={() => setVisible(false)}
            accessoryLeft={<Icon name="corner-up-left-outline" />}
          />
          <View style={styles.boxShadow}>
            <Shadow>
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
                    style={styles.container}
                    horizontal={false}
                    ItemSeparatorComponent={MessageSeparator}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <ListDetail
                        showMessages={true}
                        renderRightActions={() => (
                          <DeleteAction
                            message={item}
                            user={user}
                            setUpdateMessage={setUpdateMessage}
                            updateMessage={updateMessage}
                          />
                        )}
                        ItemSeparatorComponent={MessageSeparator}
                        message={item}
                        user={user}
                        setUpdateMessage={setUpdateMessage}
                        updateMessage={updateMessage}
                      />
                    )}
                  />
                )}
              </Card>
            </Shadow>
          </View>
        </Modal>
      </Layout>
    );
  } else {
    return (
      <Layout style={styles.container}>
        <Layout
          style={{
            height: 150,
            backgroundColor: colors.primary,
            marginBottom: 20,
          }}
        >
          <Controller
            control={control}
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
                align="top"
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
          style={styles.modal}
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <AppButton
            appBtnStyle={styles.returnBtn}
            onPress={() => setVisible(false)}
            accessoryLeft={<Icon name="corner-up-left-outline" />}
          />
          <View style={styles.boxShadow}>
            <Shadow>
              <Card style={styles.messagesContainerLandscape}>
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
                    style={styles.container}
                    horizontal={false}
                    ItemSeparatorComponent={MessageSeparator}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <ListDetail
                        showMessages={true}
                        renderRightActions={() => (
                          <DeleteAction
                            message={item}
                            user={user}
                            setUpdateMessage={setUpdateMessage}
                            updateMessage={updateMessage}
                          />
                        )}
                        ItemSeparatorComponent={MessageSeparator}
                        message={item}
                        user={user}
                        setUpdateMessage={setUpdateMessage}
                        updateMessage={updateMessage}
                      />
                    )}
                  />
                )}
              </Card>
            </Shadow>
          </View>
        </Modal>
      </Layout>
    );
  }
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.background,
  },
  boxShadow: {justifyContent: 'center', alignItems: 'center'},
  container: {
    fontSize: 16,
    fontFamily: 'Karla_700Bold',
    backgroundColor: colors.primary,
  },
  commentBox: {
    padding: 10,
    fontFamily: 'Karla',
    borderColor: colors.stroke,
    borderRadius: 7,
    backgroundColor: colors.container,
  },
  sendBtn: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
    marginBottom: 15,
    marginTop: 10,
    right: 10,
  },
  messageBtn: {
    alignSelf: 'flex-start',
    marginTop: '-22%',
    marginBottom: 20,
    left: '-8%',
  },
  modal: {top: '10%', width: 380},
  messagesContainer: {
    top: 0,
    borderRadius: 40,
    alignSelf: 'center',
    height: 700,
    backgroundColor: colors.primary,
    width: '98%',
  },
  noMessageContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    width: 300,
  },
  noMessageText: {
    fontFamily: 'Karla',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
  },
  returnBtn: {
    zIndex: 1,
    width: 40,
    height: 10,
    position: 'absolute',
    marginTop: -10,
    alignSelf: 'flex-start',
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Karla_700Bold',
    marginVertical: 15,
  },
  messagesContainerLandscape: {
    top: 0,
    borderRadius: 40,
    alignSelf: 'center',
    height: 350,
    backgroundColor: colors.primary,
    width: '98%',
  },
});

MessageList.propTypes = {
  fileId: PropTypes.number,
  showMessages: PropTypes.bool,
};

export default MessageList;
