import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {Layout, Text} from '@ui-kitten/components';
import {uploadsUrl} from '../../utils/url';
import {LinearGradient} from 'expo-linear-gradient';
import colors from '../../utils/colors';

// Return secondhand item for explore
const GalleryItem = ({navigation, singleItem}) => {
  // console.log('Listitem', singleItem);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <ImageBackground
        source={{uri: uploadsUrl + singleItem.thumbnails.w160}}
        style={styles.GalleryImage}
        imageStyle={{borderRadius: 15}}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0.5,0.5)']}
          style={{flex: 1, justifyContent: 'center', borderRadius: 15}}
        ></LinearGradient>
      </ImageBackground>

      <Layout style={styles.GalleryTextBox}>
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
  GalleryImage: {
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,

    ...Platform.select({
      ios: {
        width: 350,
        height: 220,
      },
      android: {
        width: 370,
        height: 210,
      },
    }),
  },

  GalleryTextBox: {
    position: 'absolute',
    backgroundColor: null,
    marginStart: 15,

    ...Platform.select({
      ios: {
        top: 150,
      },
      android: {
        top: 120,
      },
    }),
  },
});

GalleryItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default GalleryItem;
