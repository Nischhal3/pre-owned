import {Button} from '@ui-kitten/components';
import React from 'react';

const FormButton = (props) => {
  return (
    <Button style={props.btnStyle} onPress={props.handleSubmit(props.onSubmit)} disabled={props.disabled}>
      {props.text}
    </Button>
  );
};

export default FormButton;
