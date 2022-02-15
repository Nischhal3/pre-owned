import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

function ErrorMessage({error}) {
  if (!error) return null;
  return <Text style={styles.error}>{error}</Text>;
}
const styles = StyleSheet.create({
  error: {color: 'red'},
});
export default ErrorMessage;
