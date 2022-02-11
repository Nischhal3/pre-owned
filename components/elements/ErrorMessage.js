import {Layout, Text} from '@ui-kitten/components';
import React from 'react';

const ErrorMessage = (props) => {
  return (
    <Layout>
      {props.field && <Text status="danger">{props.field && props.text} </Text>}
    </Layout>
  );
};

export default ErrorMessage;
