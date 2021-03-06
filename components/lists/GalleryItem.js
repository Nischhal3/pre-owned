// Import from react
import React from 'react';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Shadow} from 'react-native-shadow-2';

// Import from UI Kitten
import {Text} from '@ui-kitten/components';

// Import from files
import {uploadsUrl} from '../../utils/url';
import ImageWithOverlay from '../elements/ImageWithOverlay';
import ImageDetail from '../ImageDetail';
import colors from '../../utils/colors';

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
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
      style={{padding: 8}}
    >
      <Shadow distance={7}>
        <ImageWithOverlay
          source={{uri: uploadsUrl + singleItem.thumbnails.w640}}
          style={styles.GalleryImageVertical}
        />
      </Shadow>
      {displayText === true ? (
        <Text style={styles.displayTime}>
          {moment(singleItem.time_added).format('DD.MM.YYYY hh:mm a')}
        </Text>
      ) : (
        <Text style={styles.displayTime}>{''}</Text>
      )}
      <ImageDetail
        style={styles.GalleryTextBoxVertical}
        title={singleItem.title}
      />
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
    marginStart: '10%',
    top: '72%',
  },

  GalleryTextBoxVertical: {
    position: 'absolute',
    backgroundColor: null,
    marginStart: '7%',

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
    marginStart: '7%',
    color: colors.text_light,

    ...Platform.select({
      ios: {
        marginTop: 160,
      },
      android: {
        marginTop: 130,
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
