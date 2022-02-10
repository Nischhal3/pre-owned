import React from 'react';
import {Button} from '@ui-kitten/components';
import {SafeAreaView, TouchableOpacity} from 'react-native';
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
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Button
        style={[GlobalStyles.formButtonStyle, style]}
        onPress={props.handleSubmit(props.onSubmit)}
      >
        {props.text}
      </Button>
    </SafeAreaView>
  );
};
export {AppButton, FormButton};
