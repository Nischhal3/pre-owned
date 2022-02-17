import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import colors from '../utils/colors';

// Component for displaying product details on explore image
const ImageDetail = ({style, title, price}) => {
  return (
    <Layout style={style}>
      <Text category={'h5'} style={{color: colors.text_light}}>
        {title}
      </Text>
      <Text category={'h6'} style={{color: colors.text_light}}>
        {price}
      </Text>
    </Layout>
  );
};

export default ImageDetail;
