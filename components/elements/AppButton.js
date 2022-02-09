import {Button} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import GlobalStyles from '../../utils/GlobalStyles';

const AppButton = ({title, onPress, color = colors.btnBackground, style}) => {
  return (
    <TouchableOpacity>
      <Button style={[GlobalStyles.btnStyleLarge, style]} onPress={onPress}>
        {title}
      </Button>
    </TouchableOpacity>
  );
};

export { AppButton};
