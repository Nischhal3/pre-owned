import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import PropTypes from 'prop-types';

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
  message: PropTypes.string,
};

export default ErrorMessage;
