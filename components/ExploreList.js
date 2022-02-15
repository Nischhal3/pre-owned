import {List} from '@ui-kitten/components';
import React from 'react';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/MediaHooks';
import GalleryItem from '../components/lists/GalleryItem';

// Return a horizontal list
const ItemGalleryHorizontal = ({navigation}) => {
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
        <GalleryItem navigation={navigation} singleItem={item} />
      )}
    ></List>
  );
};

// Return a vertical list
const ItemGalleryVertical = ({navigation}) => {
  const {mediaArray} = useMedia();
  // console.log('Explorer', mediaArray);
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
