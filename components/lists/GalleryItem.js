import React from 'react';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../../utils/url';
import ImageWithOverlay from '../elements/ImageWithOverlay';
import ImageDetail from '../ImageDetail';

// Single item for explore horizontal list
const GalleryItemHorizontal = ({navigation, singleItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <ImageWithOverlay
        source={{uri: uploadsUrl + singleItem.thumbnails.w640}}
        style={styles.GalleryImageHorizontal}
      />
      <ImageDetail
        style={styles.GalleryTextBoxHorizontal}
        title={singleItem.title}
      />
    </TouchableOpacity>
  );
};

// Single item for explore vertical list
const GalleryItemVertical = ({navigation, singleItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <ImageWithOverlay
        source={{uri: uploadsUrl + singleItem.thumbnails.w640}}
        style={styles.GalleryImageVertical}
      />
      <ImageDetail
        style={styles.GalleryTextBoxVertical}
        title={singleItem.title}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  GalleryImageHorizontal: {
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
    width: 280,
    height: 170,
  },

  GalleryImageVertical: {
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,

    ...Platform.select({
      ios: {
        width: 350,
        height: 220,
      },
      android: {
        width: 350,
        height: 210,
      },
    }),
  },

  GalleryTextBoxHorizontal: {
    position: 'absolute',
    backgroundColor: null,
    marginStart: 15,
    top: 120,
  },

  GalleryTextBoxVertical: {
    position: 'absolute',
    backgroundColor: null,
    marginStart: 15,

    ...Platform.select({
      ios: {
        top: 170,
      },
      android: {
        top: 160,
      },
    }),
  },
});

GalleryItemHorizontal.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

GalleryItemVertical.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export {GalleryItemHorizontal, GalleryItemVertical};
