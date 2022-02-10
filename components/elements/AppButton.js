import React from 'react';
import {Button} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import GlobalStyles from '../../utils/GlobalStyles';

const AppButton = ({title, onPress, color = colors.btnBackground, style}) => {
  return (
    <TouchableOpacity>
      <Button style={[GlobalStyles.btnStyle, style]} onPress={onPress}>
        {title}
      </Button>
    </TouchableOpacity>
  );
};

const FormButton = (props, style) => {
  return (
    <Button
      style={[GlobalStyles.btnStyle, style]}
      onPress={props.handleSubmit(props.onSubmit)}
    >
      {props.text}
    </Button>
  );
};
export {AppButton, FormButton};
