import { List } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SecondhandItemVertical, SecondhandItemHorizontal } from './ListItem';


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
    <List
    data={products}
    contentContainerStyle={styles.containerHorizontal}
    horizontal= {true}
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) =>
    <SecondhandItemHorizontal singleItem={item} />}
    ></List>
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
});


export default ItemGallery;
