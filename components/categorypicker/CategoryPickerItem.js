import {Text} from '@ui-kitten/components';
import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppIcon} from '../elements/Icons';

const CategoryPickerItem = ({item, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {/* <AppIcon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        /> */}
        <Image
          source={{
            uri: item.file,
          }}
          style={{width: 100, height: 100, borderRadius: 50}}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
    width: '33%',
  },
  label: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CategoryPickerItem;
