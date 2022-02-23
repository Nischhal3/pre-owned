import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import React from 'react';
import {TouchableHighlight, StyleSheet, Platform} from 'react-native';
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
          {/* <Layout style={{width: 50, justifyContent: 'center', left: 180}}> */}
          <ListItem style={styles.arrowIcon} accessoryRight={PointRightArrow} />
          {/* </Layout> */}
        </Layout>
      </Layout>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  arrowIcon: {
    backgroundColor: 'transparent',
    right: Platform.OS === 'android' ? 60 : 40,
    bottom: '15%',
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  description: {
    width: 250,
    color: colors.mediumGrey,

    fontFamily: 'Karla_400Regular_Italic',
  },
  detailsContainer: {
    // width: 100,
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

export default UserItem;
