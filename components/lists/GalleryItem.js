import React from 'react';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../../utils/url';
import ImageWithOverlay from '../elements/ImageWithOverlay';
import ImageDetail from '../ImageDetail';
import {Text} from '@ui-kitten/components';
import moment from 'moment';
import colors from '../../utils/colors';

// Single item for explore horizontal list
const GalleryItemHorizontal = ({navigation, singleItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <ImageWithOverlay
        source={{uri: uploadsUrl + singleItem.thumbnails.w320}}
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
const GalleryItemVertical = ({navigation, singleItem, displayText}) => {
  // console.log(singleItem);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
        console.log('file id', singleItem.file_id); // test comment with postman
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
      {displayText === true ? (
        <Text style={styles.displayTime}>
          {moment(singleItem.time_added).format('DD.MM.YYYY hh:mm a')}
        </Text>
      ) : (
        <Text style={styles.displayTime}>{''}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  GalleryImageHorizontal: {
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
    width: 280,
    height: 180,
  },

  GalleryImageVertical: {
    marginBottom: 10,

    ...Platform.select({
      ios: {
        width: 350,
        height: 220,
      },
      android: {
        width: 320,
        height: 190,
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
        top: '75%',
      },
      android: {
        top: '72%',
      },
    }),
  },
  displayTime: {
    flex: 2,
    position: 'absolute',
    fontSize: 14,
    fontFamily: 'Karla_400Regular',
    margin: 15,
    color: colors.text_light,

    ...Platform.select({
      ios: {
        marginTop: '44%',
      },
      android: {
        marginTop: '40%',
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
  displayText: PropTypes.bool,
};

export {GalleryItemHorizontal, GalleryItemVertical};
