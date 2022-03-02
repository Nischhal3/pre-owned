import React from 'react';
import {StyleSheet, TouchableOpacity, Platform, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../../utils/url';
import ImageWithOverlay from '../elements/ImageWithOverlay';
import ImageDetail from '../ImageDetail';
import {Card, Text} from '@ui-kitten/components';
import moment from 'moment';
import colors from '../../utils/colors';
import {Shadow} from 'react-native-shadow-2';

// Single item for explore horizontal list
const GalleryItemHorizontal = ({navigation, singleItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
      style={{marginTop: '1%', marginBottom: '5%', padding: 6}}
    >
      <Shadow distance={7}>
        <ImageWithOverlay
          source={{uri: uploadsUrl + singleItem.thumbnails.w320}}
          style={styles.GalleryImageHorizontal}
        />
      </Shadow>
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
      style={{padding: 8}}
    >
      <Shadow distance={7}>
        <ImageWithOverlay
          source={{uri: uploadsUrl + singleItem.thumbnails.w640}}
          style={styles.GalleryImageVertical}
        />
      </Shadow>
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
    borderRadius: 15,
    width: 280,
    height: 180,
  },

  GalleryImageVertical: {
    borderRadius: 15,

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
    marginStart: '5%',
    top: '65%',
  },

  GalleryTextBoxVertical: {
    position: 'absolute',
    backgroundColor: null,
    marginStart: '5%',

    ...Platform.select({
      ios: {
        top: '81%',
      },
      android: {
        top: '78%',
      },
    }),
  },
  displayTime: {
    flex: 2,
    position: 'absolute',
    fontSize: 14,
    fontFamily: 'Karla_400Regular',
    margin: '5%',
    color: colors.text_light,

    ...Platform.select({
      ios: {
        marginTop: '45%',
      },
      android: {
        marginTop: '35%',
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
