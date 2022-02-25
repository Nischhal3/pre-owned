// Import from React
import React, {useContext} from 'react';
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

// now in use: ProductDetail.js, Messages
const ListDetail = ({
  image,
  IconComponent,
  renderRightActions,
  showMessages,
  message,
  user,
}) => {
  const handleDelete = () => {
    Alert.alert('Delete Message', 'Confirm delete action?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await getToken();
            const response = await deleteMessage(message.comment_id, token);
            // console.log(response);
            if (response) {
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
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.description}
            >
              {message.comment}
            </Text>
          </Layout>
          {/* When in android, message list shows a delete btn while ios swipeable */}
          {showMessages && Platform.OS === 'android' ? (
            <>
              <Text style={styles.timeAndroid}>
                {moment(message.time_added).format('     HH:mm DD.MM.YYYY ')}
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
            <Text style={styles.time}>
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
    // flex: 1,
    right: Platform.OS === 'android' ? 40 : 20,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: colors.box,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Karla_400Regular',
    bottom: 5,
    right: 120,
    lineHeight: 20,
  },
  description: {
    width: 250,
    color: colors.mediumGrey,
    paddingVertical: 5,
    fontFamily: 'Karla_400Regular_Italic',
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: colors.box,
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: colors.text_light,
  },
  time: {
    width: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Karla_400Regular',
    bottom: -5,
    top: 15,
    right: 70,
    lineHeight: 20,
  },
  timeAndroid: {
    width: 70,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    fontSize: 10,
    fontFamily: 'Karla_400Regular',
    bottom: -5,
    top: 15,
    right: 110,
    lineHeight: 20,
  },
  title: {fontWeight: '500', fontFamily: 'Karla_700Bold'},
});

export default ListDetail;
