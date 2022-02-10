import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import colors from '../utils/colors';

// Return secondhand item for explore
const GalleryItem = (props) => {
  return (
    <TouchableOpacity>
      <Image
        source={{uri: props.singleItem.thumbnails.w160}}
        style={styles.GalleryImage}
      />
      <Layout style={styles.GalleryTextBox}>
        <Text style={styles.GalleryTitle}>{props.singleItem.title}</Text>
        <Text style={styles.GalleryPrice}>{props.singleItem.price}</Text>
      </Layout>
    </TouchableOpacity>
  );
};

// Return secondhand item for other views
const ListItems = (props) => {
  return (
    <ListItem>
      <Avatar
        shape="square"
        size={'giant'}
        source={{uri: props.singleItem.thumbnails.w160}}
      />
      <ListItem>
        <Text>{props.singleItem.title}</Text>
        <Text>{props.singleItem.price}</Text>
      </ListItem>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  GalleryImage: {
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
    width: 340,
    height: 200,
  },

  GalleryTextBox: {
    flex: 1,
    position: 'absolute',
    backgroundColor: null,
    top: 100,
    margin: 15,
  },

  GalleryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text_light,
  },

  GalleryPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text_light,
  },

  ListImage: {
    flex: 1,
    marginEnd: 10,
    marginBottom: 15,
    width: '30%',
    height: 100,
  },

  ListTextBox: {
    flex: 1,
    position: 'absolute',
    left: '35%',
    top: '20%',
    backgroundColor: null,
  },

  ListTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Karla',
    color: colors.text_dark,
  },

  ListPrice: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Karla',
    color: colors.text_dark,
  },
});

GalleryItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
};

ListItems.propTypes = {
  singleItem: PropTypes.object.isRequired,
};

export {GalleryItem, ListItems};
