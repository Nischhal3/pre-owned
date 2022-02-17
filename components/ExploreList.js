import {List} from '@ui-kitten/components';
import React from 'react';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/MediaHooks';
import {GalleryItemHorizontal, GalleryItemVertical} from './lists/GalleryItem';

// Return a horizontal gallery list
const GalleryListHorizontal = ({navigation}) => {
  const {mediaArray} = useMedia();

  // Sorting items by recently added date
  mediaArray.sort((a, b) => a.time_added < b.time_added);

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
        <GalleryItemHorizontal navigation={navigation} singleItem={item} />
      )}
    ></List>
  );
};

// Return a vertical gallery list
const GalleryListVertical = ({navigation}) => {
  const {mediaArray} = useMedia();
  // console.log('Explorer', mediaArray);
  return (
    <List
      data={mediaArray}
      contentContainerStyle={{marginStart: 10, alignItems: 'center'}}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <GalleryItemVertical navigation={navigation} singleItem={item} />
      )}
    ></List>
  );
};

GalleryListHorizontal.propTypes = {
  navigation: PropTypes.object,
};
GalleryListVertical.propTypes = {
  navigation: PropTypes.object,
};

export {GalleryListHorizontal, GalleryListVertical};
