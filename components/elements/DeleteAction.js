import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Button, Icon} from '@ui-kitten/components';
import {colors} from '../../utils';

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
DeleteAction.propTypes = {
  onPress: PropTypes.object,
};
export default DeleteAction;
