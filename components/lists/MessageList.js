import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Alert, View} from 'react-native';
import {Layout, Divider, Text, Avatar} from '@ui-kitten/components';

import DeleteAction from '../elements/DeleteAction';
import ListDetail from './ListDetail';
import {useMessage} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';
import MessageItem from '../elements/MessageItem';

const MessageList = ({message, avatar, user, time}) => {
  // delete message
  // const handleDelete = (message) => {
  //   Alert.alert(
  //     'Delete message',
  //     'Are you sure you want to delete this message?',
  //     [
  //       {text: 'Cancel'},
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           // delete the message from messages array
  //           setMessages(messages.filter((m) => m.id !== message.id));
  //         },
  //       },
  //     ]
  //   );
  // };

  return (
    <Layout>
      {/* <Avatar style={styles.image} source={image} /> */}
      <Text> {message.comment}</Text>
      {/* <Text>{user}</Text>
      <Text> {time}</Text> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
});
export default MessageList;
