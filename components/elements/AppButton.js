import React from 'react';
import {Button, Icon} from '@ui-kitten/components';
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

const PasswordButton = (props) => {
  return (
    <Button
      style={props.style}
      appearance="ghost"
      onPress={props.onPress}
      accessoryLeft={props.iconName ? <Icon name={props.iconName} /> : null}
    >
    </Button>
  );
};

AppButton.propTypes = {
  appBtnStyle: PropTypes.object,
  size: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string,
  accessoryLeft: PropTypes.object,
  accessoryRight: PropTypes.object,
};
FormButton.propTypes = {
  style: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
};
PasswordButton.propTypes = {
  appBtnStyle: PropTypes.object,
  onPress: PropTypes.func,
  accessoryLeft: PropTypes.object,
};
export {AppButton, FormButton, PasswordButton};
