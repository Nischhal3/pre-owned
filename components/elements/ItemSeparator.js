import {Layout} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const ItemSeparator = () => {
  return <Layout style={styles.separator} />;
};

const MessageSeparator = () => {
  return <Layout style={styles.msgSeparator} />;
};
const styles = StyleSheet.create({
  msgSeparator: {
    width: '100%',
    height: 2,
    backgroundColor: colors.text_dark,
  },
  separator: {
    width: '100%',
    height: 5,
    backgroundColor: colors.background,
  },
});
export default {ItemSeparator, MessageSeparator};
