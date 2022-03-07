import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import PropTypes from 'prop-types';
import {colors} from '../../utils';

const ErrorMessage = (props) => {
  return (
    <Layout>
      {props.error && (
        <Text status="danger" style={{backgroundColor: colors.primary}}>
          {props.error && props.message}{' '}
        </Text>
      )}
    </Layout>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
  message: PropTypes.string,
};

export default ErrorMessage;
