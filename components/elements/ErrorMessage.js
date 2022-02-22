import {Layout, Text} from '@ui-kitten/components';
import React from 'react';

const ErrorMessage = (props) => {
  return (
    <Layout>
      {props.error && (
        <Text status="danger">{props.error && props.message} </Text>
      )}
    </Layout>
  );
};

export default ErrorMessage;
