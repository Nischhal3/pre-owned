import {List, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SecondhandItemVertical, SecondhandItemHorizontal} from './ListItem';
import colors from '../utils/colors';
import PropTypes from 'prop-types';

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

// Return a horizontal list
const ItemGalleryHorizontal = ({navigation}) => {
  return (
    <>
      <Text style={styles.title}>Recently added</Text>
      <List
        data={products}
        contentContainerStyle={styles.containerHorizontal}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <SecondhandItemHorizontal navigation={navigation} singleItem={item} />
        )}
      ></List>
    </>
  );
};

// Return a vertical list
const ItemGalleryVertical = ({navigation}) => {
  return (
    <>
      <Text style={styles.title}>Popular Now</Text>
      <List
        data={products}
        contentContainerStyle={styles.containerVertical}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <SecondhandItemVertical navigation={navigation} singleItem={item} />
        )}
      ></List>
    </>
  );
};

const styles = StyleSheet.create({
  containerHorizontal: {
    marginStart: 20,
    marginBottom: 140,
  },
  containerVertical: {
    marginStart: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    margin: 20,
    color: colors.text_dark,
  },
});
ItemGalleryHorizontal.propTypes = {
  navigation: PropTypes.object,
};
ItemGalleryVertical.propTypes = {
  navigation: PropTypes.object,
};
export {ItemGalleryHorizontal, ItemGalleryVertical};
