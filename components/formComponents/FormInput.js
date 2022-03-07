import {Icon, Input} from '@ui-kitten/components';
import React from 'react';
import {GlobalStyles} from '../../utils';
import PropTypes from 'prop-types';

const FormInput = (props) => {
  return (
    <Input
      style={[GlobalStyles.input, props.style]}
      placeholder={props.name}
      onBlur={props.onBlur}
      accessoryLeft={props.iconName ? <Icon name={props.iconName} /> : null}
      onChangeText={props.onChange}
      value={props.value}
      autoCapitalize="none"
      secureTextEntry={props.textEntry}
      multiline={props.multiline}
      textStyle={props.textStyle}
      textAlignVertical={props.align ? props.align : null}
      label={props.label}
    />
  );
};

FormInput.propTypes = {
  name: PropTypes.string,
  onBlur: PropTypes.any,
  iconName: PropTypes.string,
  onchange: PropTypes.any,
  value: PropTypes.string,
  textEntry: PropTypes.bool,
  multiline: PropTypes.any,
  textStyle: PropTypes.any,
  align: PropTypes.any,
  label: PropTypes.string,
};

export default FormInput;
