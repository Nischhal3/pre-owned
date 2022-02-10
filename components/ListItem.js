import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Icon, Layout, ListItem, Text} from '@ui-kitten/components';
import colors from '../utils/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Return secondhand item for explore
const GalleryItem = ({navigation, singleItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {file: singleItem});
      }}
    >
      <Image
        source={{uri: singleItem.thumbnails.w160}}
        style={styles.GalleryImage}
      />
      <Layout style={styles.GalleryTextBox}>
        <Text style={styles.GalleryTitle}>{singleItem.title}</Text>
        <Text style={styles.GalleryPrice}>{singleItem.price}</Text>
      </Layout>
    </TouchableOpacity>
  );
};

// Return secondhand item for other views
const PlainListItem = ({singleItem}) => {
  return (
    <ListItem>
      <Avatar
        shape="square"
        size={'giant'}
        source={{uri: singleItem.thumbnails.w160}}
      />
      <ListItem>
        <Text>{singleItem.title}</Text>
        <Text>{singleItem.price}</Text>
      </ListItem>
    </ListItem>
  );
};

// for productDetail page
const ProductList = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.text_light} onPress={onPress}>
        <Layout style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <Layout style={styles.detailsContainer}>
            <Text style={{fontWeight: '500'}}>{title}</Text>
            {subTitle && (
              <Text style={{color: colors.text_dark}}>{subTitle}</Text>
            )}
          </Layout>
        </Layout>
      </TouchableHighlight>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.text_light,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  GalleryImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
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
  navigation: PropTypes.object.isRequired,
};

PlainListItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export {GalleryItem, PlainListItem, ProductList};
