import {Icon, Input} from '@ui-kitten/components';
import React from 'react';

const FormInput = (props) => {
  return (
    <Input
      style={props.style}
      placeholder={props.name}
      onBlur={props.onBlur}
      accessoryLeft={<Icon name={props.iconName} />}
      onChangeText={props.onChange}
      value={props.value}
      autoCapitalize="none"
      secureTextEntry={props.textEntry}
    />
  );
};

export default FormInput;
