import {Layout} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const ItemSeparator = () => {
  return <Layout style={styles.separator} />;
};
const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 2,
    margin: 10,
    backgroundColor: colors.background,
  },
});
export default ItemSeparator;
