import {Layout} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

const ItemSeparator = () => {
  return <Layout style={styles.separator} />;
};
const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lightGrey,
  },
});
export default ItemSeparator;
