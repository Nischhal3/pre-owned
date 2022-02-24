import React from 'react';
import {Button, Spinner} from '@ui-kitten/components';
import {GlobalStyles} from '../../utils';

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

const UploadButton = (props, style) => {
  return (
    <Button
      style={[GlobalStyles.formButtonStyle, style]}
      onPress={props.handleSubmit(props.onSubmit)}
      accessoryLeft={<Spinner size="small" color="#fff" />}
    >
      {props.text}
    </Button>
  );
};

export {AppButton, FormButton, UploadButton};
