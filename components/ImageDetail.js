// Import from react
import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten library
import {Layout, Text} from '@ui-kitten/components';

// Import from files
import {colors} from '../utils';

// Component for displaying product details on explore image
const ImageDetail = ({style, title}) => {
  return (
    <Layout style={style}>
      <Text style={styles.imageTitle}>{title}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageTitle: {
    fontSize: 22,
    color: colors.text_light,
    fontFamily: 'Karla_700Bold',
  },
});

ImageDetail.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
};

export default ImageDetail;
