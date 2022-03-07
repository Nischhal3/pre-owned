import {Divider, Layout} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const ItemSeparator = () => {
  return <Layout style={styles.separator} />;
};

const MessageSeparator = () => {
  return <Layout style={styles.msgSeparator} />;
};

const ProfileSeparator = () => {
  return <Divider style={styles.profileSeparator} />;
};

const styles = StyleSheet.create({
  msgSeparator: {
    width: '100%',
    height: 1.5,
    backgroundColor: colors.lightGrey,
  },
  separator: {
    width: '100%',
    height: 5,
    backgroundColor: colors.background,
  },
  profileSeparator: {
    width: '80%',
    height: 0.5,
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: colors.text_dark,
  },
});
export {ItemSeparator, MessageSeparator, ProfileSeparator};
