import {Text} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity, StyleSheet, Picker} from 'react-native';

const PickerItem = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
