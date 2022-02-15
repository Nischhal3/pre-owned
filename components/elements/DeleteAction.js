import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Button, Icon, Layout} from '@ui-kitten/components';
import colors from '../../utils/colors';

const DeleteAction = ({onPress}) => {
  return (
    <TouchableWithoutFeedback>
      <Button
        onPress={onPress}
        style={styles.container}
        accessoryRight={<Icon name="trash-outline" colors="fff" />}
      ></Button>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default DeleteAction;
