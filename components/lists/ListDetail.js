// Import from React
import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableHighlight, Platform, Alert} from 'react-native';
import moment from 'moment';
// Import from UI Kitten Library
import {Avatar, Button, Icon, Layout, Text} from '@ui-kitten/components';
import {Swipeable} from 'react-native-gesture-handler';

// Import from files
import {colors} from '../../utils';
import {getToken} from '../../hooks/CommonFunction';
import {deleteMessage} from '../../hooks/MessageHook';
import {MainContext} from '../../contexts/MainContext';
import ReadMore from 'react-native-read-more-text';

// now in use: ProductDetail.js, Messages
const ListDetail = ({
  props,
  image,
  IconComponent,
  renderRightActions,
  showMessages,
  message,
  user,
  setUpdateMessage,
  updateMessage,
}) => {
  // Can't use MainContext here ?
  // const {updateMessage, setUpdateMessage} = useContext(MainContext);
  const handleDelete = () => {
    Alert.alert('Delete Message', 'Confirm delete action?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await getToken();
            const response = await deleteMessage(message.comment_id, token);
            if (response) {
              setUpdateMessage(updateMessage + 1);
              Alert.alert('Message deleted');
              return;
            }
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.text_light}>
        <Layout style={styles.container}>
          {IconComponent}
          {image && <Avatar style={styles.image} source={image} />}
          <Layout style={styles.detailsContainer}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {message.username}
            </Text>
            <Layout style={styles.readMore}>
              <ReadMore numberOfLines={1}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.description}
                >
                  {message.comment}
                </Text>
              </ReadMore>
            </Layout>
          </Layout>
          {/* When in android, message list shows a delete btn while ios swipeable */}
          {showMessages && Platform.OS === 'android' ? (
            <>
              <Text style={styles.timeAndroid}>
                {moment(message.time_added).format('DD.MM.YYYY hh:mm a')}
              </Text>
              {user.username === message.username ? (
                <Button
                  appearance={'ghost'}
                  style={styles.deleteBtn}
                  accessoryLeft={<Icon name="trash-2-outline" />}
                  onPress={handleDelete}
                />
              ) : null}
            </>
          ) : (
            <Text style={styles.timeIos}>
              {moment(message.time_added).format('DD.MM.YYYY hh:mm a')}
            </Text>
          )}
        </Layout>
      </TouchableHighlight>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  arrowIcon: {
    right: Platform.OS === 'android' ? 40 : 20,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Karla_400Regular',
    top: 0,
    bottom: 5,
    right: 40,
    lineHeight: 20,
  },
  description: {
    color: colors.text_dark,
    paddingVertical: 5,
    fontFamily: 'Karla_400Regular',
  },
  detailsContainer: {
    width: '50%',
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: colors.text_light,
  },
  readMore: {
    width: 150,
    marginTop: 5,
    backgroundColor: 'transparent',
  },
  timeIos: {
    width: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Karla_400Regular',
    bottom: -5,
    top: 15,
    right: -10,
    lineHeight: 20,
  },
  timeAndroid: {
    width: 70,
    fontSize: 10,
    fontFamily: 'Karla_400Regular',
    bottom: -5,
    top: 15,
    right: 10,
    lineHeight: 20,
    marginLeft: 15,
  },
  title: {fontWeight: '500', fontFamily: 'Karla_700Bold'},
});

export default ListDetail;
