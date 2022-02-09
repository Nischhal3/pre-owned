import { Layout, List, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import SecondhandItem from './ListItem';
import colors from '../utils/colors';
import PropTypes from 'prop-types';

const products = [
  {
      'key': '0',
      'title': 'Carbinet for sale',
      'price': '€45',
      'thumbnails': {
          w160: 'http://placekitten.com/2048/1919',
      },
      'filename': 'http://placekitten.com/2048/1920',
  },
  {
      'key': '1',
      'title': 'Kittens',
      'price': '9e',
      'thumbnails': {
          w160: 'http://placekitten.com/2048/1920',
      },
      'filename': 'http://placekitten.com/2041/1922',
  },
  {
      'key': '2',
      'title': 'Annoying cat',
      'price': '5e',
      'thumbnails': {
          w160: 'http://placekitten.com/2048/1921',
      },
      'filename': 'http://placekitten.com/2039/1920',
  },
];

// Return a horizontal list
const ItemGalleryHorizontal = () => {
  return (
    <List
    data={products}
    contentContainerStyle={styles.containerHorizontal}
    horizontal= {true}
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) =>
    <SecondhandItem singleItem={item} />}
    ></List>
  );
};

// Return a vertical list
const ItemGalleryVertical = () => {
  return (
    <List
    data={products}
    contentContainerStyle={styles.containerVertical}
    horizontal= {false}
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) =>
    <SecondhandItem singleItem={item}/>}
    ></List>
  );
};


const styles = StyleSheet.create({
  containerHorizontal: {
    marginStart: 20,
    marginBottom: 200,
  },

  containerVertical: {
    width: '100%',
    marginStart: 20,
  },
});

ItemGalleryHorizontal.propTypes = {
  navigation: PropTypes.object,
};


export {ItemGalleryHorizontal, ItemGalleryVertical};
