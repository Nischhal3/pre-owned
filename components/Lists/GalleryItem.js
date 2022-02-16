import React from 'react';
import {StyleSheet, TouchableOpacity, Platform, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';
import {Layout, Text} from '@ui-kitten/components';
import {uploadsUrl} from '../../utils/url';
import colors from '../../utils/colors';
import ImageWithOverlay from '../elements/ImageWithOverlay';

// Single item for explore horizontal list
const GalleryItemHorizontal = ({navigation, singleItem}) => {
  // console.log('Listitem', singleItem);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <ImageWithOverlay
        source={{uri: uploadsUrl + singleItem.thumbnails.w160}}
        style={styles.GalleryImageHorizontal}
      />
      <Layout style={styles.GalleryTextBoxHorizontal}>
        <Text category={'h5'} style={{color: colors.text_light}}>
          {singleItem.title}
        </Text>
        <Text category={'h6'} style={{color: colors.text_light}}>
          {singleItem.price}
        </Text>
      </Layout>
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
        source={{uri: uploadsUrl + singleItem.thumbnails.w160}}
        style={styles.GalleryImageVertical}
      />
      <Layout style={styles.GalleryTextBoxVertical}>
        <Text category={'h5'} style={{color: colors.text_light}}>
          {singleItem.title}
        </Text>
        <Text category={'h6'} style={{color: colors.text_light}}>
          {singleItem.price}
        </Text>
      </Layout>
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

    ...Platform.select({
      ios: {
        top: 120,
      },
      android: {
        top: 100,
      },
    }),
  },

  GalleryTextBoxVertical: {
    position: 'absolute',
    backgroundColor: null,
    marginStart: 15,

    ...Platform.select({
      ios: {
        top: 150,
      },
      android: {
        top: 140,
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
