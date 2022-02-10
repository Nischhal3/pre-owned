import React from 'react';
import {Button} from '@ui-kitten/components';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import GlobalStyles from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

const AppButton = ({title, onPress, color = colors.btnBackground, style}) => {
  return (
    <TouchableOpacity>
      <Button style={[GlobalStyles.btnStyle, style]} onPress={onPress}>
        {title}
      </Button>
    </TouchableOpacity>
  );
};

AppButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.object,
  style: PropTypes.object,
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

FormButton.propTypes = {
  text: PropTypes.string,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export {AppButton, FormButton};
