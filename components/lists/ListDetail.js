// Import from React
import React from 'react';
import {StyleSheet, TouchableHighlight, Platform} from 'react-native';

// Import from UI Kitten Library
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Import from files
import {PointRightArrow} from '../elements/Icons';
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
          <Text style={styles.time}>{timeAdded}</Text>
          {!showMessages ? (
            <ListItem
              style={styles.arrowIcon}
              accessoryRight={PointRightArrow}
            />
          ) : (
            <Text>{''}</Text>
          )}
        </Layout>
      </TouchableHighlight>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  arrowIcon: {
    marginLeft: 20,
    backgroundColor: colors.text_light,
    flex: 1,
    right: Platform.OS === 'android' ? 40 : 20,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: colors.container,
    justifyContent: 'space-between',
  },
  description: {
    width: 250,
    color: colors.mediumGrey,
    paddingVertical: 5,
    fontFamily: 'Karla_400Regular_Italic',
  },
  detailsContainer: {
    // width: 100,
    marginLeft: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.container,
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: colors.container,
  },
  time: {
    fontSize: 14,
    fontFamily: 'Karla_400Regular',
    bottom: -5,
    right: 100,
  },
  title: {fontWeight: '500', fontFamily: 'Karla_700Bold'},
});

export default ListDetail;
