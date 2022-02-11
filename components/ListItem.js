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
import {PointRightArrow} from './elements/Icons';

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

// for productDetail page
const ListDetail = ({
  title,
  description,
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
          {image && <Avatar style={styles.image} source={image} />}
          <Layout style={styles.detailsContainer}>
            <Text style={{fontWeight: '500'}}>{title}</Text>
            {description && (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{width: 250, color: colors.mediumGrey}}
              >
                {description}
              </Text>
            )}
          </Layout>
          <ListItem style={{flex: 1}} accessoryRight={PointRightArrow} />
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
  },

  GalleryImage: {
    width: 340,
    height: 200,
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
  },

  GalleryTextBox: {
    flex: 1,
    position: 'absolute',
    backgroundColor: null,
    top: 120,
    margin: 15,
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

export {GalleryItem, PlainListItem, ListDetail};
