import React from 'react';
import {Button, Spinner} from '@ui-kitten/components';
import {GlobalStyles} from '../../utils';
import PropTypes from 'prop-types';

const AppButton = (props) => {
  return (
    <Button
      style={[GlobalStyles.btnStyle, props.appBtnStyle]}
      size={props.size}
      onPress={props.onPress}
      accessoryLeft={props.accessoryLeft}
      accessoryRight={props.accessoryRight}
    >
      {props.title}
    </Button>
  );
};

const FormButton = (props) => {
  return (
    <Button
      style={[GlobalStyles.formButtonStyle, props.style]}
      onPress={props.handleSubmit(props.onSubmit)}
      disabled={props.disabled}
    >
      {props.text}
    </Button>
  );
};

AppButton.propTypes = {
  appBtnStyle: PropTypes.object,
  size: PropTypes.object,
  onPress: PropTypes.object,
  title: PropTypes.object,
  accessoryLeft: PropTypes.object,
  accessoryRight: PropTypes.object,
};
FormButton.propTypes = {
  style: PropTypes.object,
  handleSubmit: PropTypes.object,
  onSubmit: PropTypes.object,
  disabled: PropTypes.object,
  text: PropTypes.object,
};
export {AppButton, FormButton};
