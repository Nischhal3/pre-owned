import {List} from '@ui-kitten/components';
import React from 'react';
import PropTypes from 'prop-types';
import {GalleryItem} from './ListItem';
import {useMedia} from '../hooks/MediaHooks';

const products = [
  {
    key: '0',
    title: 'Cabinet for sale',
    price: '€45',
    published: '1 day ago',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1919',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Kittens',
    published: '1 day ago',
    price: '9e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1920',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Annoying cat',
    published: '1 day ago',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '3',
    title: 'Annoying cat',
    published: '1 day ago',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '4',
    title: 'Annoying cat',
    published: '1 day ago',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '5',
    title: 'Annoying cat',
    published: '1 day ago',
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
  const {mediaArray} = useMedia();
  return (
    <List
      data={mediaArray}
      contentContainerStyle={{
        marginStart: 20,
        alignItems: 'center',
      }}
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
  const {mediaArray} = useMedia();
  console.log('Explorer', {mediaArray});
  return (
    <List
      data={mediaArray}
      contentContainerStyle={{marginStart: 20}}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <GalleryItem navigation={navigation} singleItem={item} />
      )}
    ></List>
  );
};

ItemGalleryHorizontal.propTypes = {
  navigation: PropTypes.object,
};
ItemGalleryVertical.propTypes = {
  navigation: PropTypes.object,
};

export {ItemGalleryHorizontal, ItemGalleryVertical};
