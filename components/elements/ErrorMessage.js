import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Text} from '@ui-kitten/components';

const ErrorMessage = (props) => {
  return (
    <Layout>
      {props.error && (
        <Text status="danger">{props.error && props.message} </Text>
      )}
    </Layout>
  );
};
ErrorMessage.propTypes = {
  error: PropTypes.object,
  message: PropTypes.object,
};
export default ErrorMessage;
