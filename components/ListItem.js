import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Layout, Text } from '@ui-kitten/components';
import colors from '../utils/colors';

// Return secondhand item
const SecondhandItem = (props) => {
  return (
       <TouchableOpacity>
       <Image
       source={{uri: props.singleItem.thumbnails.w160}}
       style={styles.image} />
           <Layout style={styles.textBox}>
                <Text style={styles.title}>{props.singleItem.title}</Text>
                <Text style={styles.price}>{props.singleItem.price}</Text>
            </Layout>
       </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
    width: 340,
    height: 200,
  },

  textBox: {
    flex: 1,
    position: 'absolute',
    backgroundColor: null,
    top: 100,
    margin: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text_light,
  },

  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text_light,
  },
});

SecondhandItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
};


export default SecondhandItem;
