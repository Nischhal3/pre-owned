// Import from React
import React from 'react';
import {StyleSheet, TouchableHighlight, Platform} from 'react-native';
import moment from 'moment';
// Import from UI Kitten Library
import {Avatar, Button, Icon, Layout, Text} from '@ui-kitten/components';
import {Swipeable} from 'react-native-gesture-handler';

// Import from files
import {colors} from '../../utils';

// now in use: ProductDetail.js, Messages
const ListDetail = ({
  description,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  showMessages,
  title,
  timeAdded,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.text_light} onPress={onPress}>
        <Layout style={styles.container}>
          {IconComponent}
          {image && <Avatar style={styles.image} source={image} />}
          <Layout style={styles.detailsContainer}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.description}
            >
              {description}
            </Text>
          </Layout>
          {/* When in android, message list shows a delete btn while ios swipeable */}
          {showMessages && Platform.OS === 'android' ? (
            <>
              <Text style={styles.timeAndroid}>
                {moment(timeAdded).format('     HH:mm DD.MM.YYYY ')}
              </Text>
              <Button
                appearance={'ghost'}
                style={styles.deleteBtn}
                accessoryLeft={<Icon name="trash-2-outline" />}
                onPress={() => {
                  alert('btn delete pressed');
                }}
              />
            </>
          ) : (
            <Text style={styles.time}>
              {moment(timeAdded).format('DD.MM.YYYY hh:mm a')}
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
    backgroundColor: colors.primary,
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
    backgroundColor: colors.primary,
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
