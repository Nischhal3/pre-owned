import { List, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SecondhandItemVertical, SecondhandItemHorizontal } from './ListItem';
import {text_dark} from '../utils/colors';

const products = [
  {
      'key': '0',
      'title': 'Pink t-shirt',
      'price': '2e',
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


const ItemGallery = () => {
  return (
    <>
     <Text style={styles.title}>Recently added</Text>
    <List
    data={products}
    contentContainerStyle={styles.containerHorizontal}
    horizontal= {true}
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) =>
    <SecondhandItemHorizontal singleItem={item} />}
    ></List>
    <Text style={styles.title}>Popular Now</Text>
    <List
    data={products}
    contentContainerStyle={styles.containerVertical}
    horizontal= {false}
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) =>
    <SecondhandItemVertical singleItem={item} />}
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
    color: text_dark,
  },
});


export default ItemGallery;
