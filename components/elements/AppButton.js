import React from 'react';
import {Button, Icon} from '@ui-kitten/components';
import {colors, GlobalStyles} from '../../utils';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';

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
      {props.loading ? (
        <ActivityIndicator
          animating={props.loading}
          color={colors.text_light}
          size="large"
        />
      ) : (
        props.text
      )}
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
  loading: PropTypes.bool,
  text: PropTypes.string,
};
PasswordButton.propTypes = {
  appBtnStyle: PropTypes.object,
  onPress: PropTypes.func,
  accessoryLeft: PropTypes.object,
};
export {AppButton, FormButton, PasswordButton};
