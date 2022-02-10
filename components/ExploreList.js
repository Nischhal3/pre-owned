import {List, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {GalleryItem} from './ListItem';

const products = [
  {
    key: '0',
    title: 'Carbinet for sale',
    price: '€45',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1919',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Kittens',
    price: '9e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1920',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Annoying cat',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

// TODO fetch items from server, item fetch to be added in API hooks
// Return a horizontal list
const ItemGalleryHorizontal = ({navigation}) => {
  return (
    <List
      data={products}
      contentContainerStyle={styles.containerHorizontal}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <GalleryItem navigation={navigation} singleItem={item} />
      )}
    ></List>
  );
};

// Return a vertical list
const ItemGalleryVertical = ({navigation}) => {
  return (
    <List
      data={products}
      contentContainerStyle={styles.containerVertical}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <GalleryItem navigation={navigation} singleItem={item} />
      )}
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
ItemGalleryVertical.propTypes = {
  navigation: PropTypes.object,
};

export {ItemGalleryHorizontal, ItemGalleryVertical};
