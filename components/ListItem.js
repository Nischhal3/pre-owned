import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import colors from '../utils/colors';
import {PointRightArrow} from './elements/Icons';
import {uploadsUrl} from '../utils/url';
import {LinearGradient} from 'expo-linear-gradient';

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

// Return secondhand item for other views
const PlainListItem = ({navigation, singleItem}) => {
  return (
    <ListItem style={{flex: 1, flexDirection: 'row'}}>
      <Avatar
        shape="square"
        size={'giant'}
        source={{uri: singleItem.thumbnails.w160}}
      />
      <ListItem style={styles.ListItemDetails}>
        <Text category={'h6'} style={{fontWeight: '500', marginBottom: 5}}>
          {singleItem.title}
        </Text>
        <Text category={'p1'}>{singleItem.price}</Text>
      </ListItem>
      <Text category={'p2'} style={{flex: 2}}>
        {singleItem.published}
      </Text>
      <ListItem style={{flex: 1}} accessoryRight={PointRightArrow} />
    </ListItem>
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
        width: 320,
        height: 190,
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

  ListItemDetails: {
    flex: 6,
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginStart: 15,
  },
});

GalleryItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

PlainListItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export {GalleryItem, PlainListItem};
