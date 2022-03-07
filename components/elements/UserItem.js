// Import from React
import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';

// Import from files
import {colors} from '../../utils';
import {PointRightArrow} from './Icons';

const UserItem = ({title, description, onPress, image}) => {
  return (
    <ListItem
      style={styles.container}
      underlayColor={colors.text_light}
      onPress={onPress}
    >
      <Avatar style={styles.image} source={image} />
      <Layout style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <ListItem style={styles.arrowIcon} accessoryRight={PointRightArrow} />
      </Layout>
    </ListItem>
  );
};
const styles = StyleSheet.create({
  arrowIcon: {
    backgroundColor: 'transparent',
    right: Platform.OS === 'android' ? 55 : 50,
    bottom: '17%',
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  description: {
    width: 250,
    color: colors.mediumGrey,
    fontFamily: 'Karla_400Regular_Italic',
  },
  detailsContainer: {
    paddingLeft: 20,
    top: 25,
    backgroundColor: colors.primary,
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: colors.container,
  },
  title: {fontWeight: '500', fontFamily: 'Karla_700Bold'},
});
UserItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  onPress: PropTypes.func,
};

export default UserItem;
