import React from 'react';
import {TouchableHighlight, StyleSheet, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import {colors} from '../../utils';
import {PointRightArrow} from './Icons';

const UserItem = ({title, description, onPress, image}) => {
  return (
    <TouchableHighlight underlayColor={colors.text_light} onPress={onPress}>
      <Layout style={styles.container}>
        <Avatar style={styles.image} source={image} />
        <Layout style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <ListItem style={styles.arrowIcon} accessoryRight={PointRightArrow} />
        </Layout>
      </Layout>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  arrowIcon: {
    backgroundColor: 'transparent',
    right: Platform.OS === 'android' ? 56 : 30,
    bottom: '17%',
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    marginBottom: -15,
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
    top: 20,
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
};

export default UserItem;
