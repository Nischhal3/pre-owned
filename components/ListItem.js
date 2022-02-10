import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Icon, Layout, Text} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';

// Return secondhand item for horizontal list
const SecondhandItemHorizontal = ({navigation, singleItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {file: singleItem});
      }}
    >
      <Image
        source={{uri: singleItem.thumbnails.w160}}
        style={styles.imageHorizontal}
      />
      <Layout style={styles.textBoxHorizontal}>
        <Text style={styles.title}>{singleItem.title}</Text>
        <Text style={styles.price}>{singleItem.price}</Text>
      </Layout>
    </TouchableOpacity>
  );
};

// Return secondhand item for vertical list
const SecondhandItemVertical = ({navigation, singleItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {file: singleItem});
      }}
    >
      <Image
        source={{uri: singleItem.thumbnails.w160}}
        style={styles.imageVertical}
      />
      <Layout style={styles.textBoxVertical}>
        <Text style={styles.title}>{singleItem.title}</Text>
        <Text style={styles.price}>{singleItem.price}</Text>
      </Layout>
    </TouchableOpacity>
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
        {/* <Icon colors={colors.stroke} name="chevron-right-outline" size={25} /> */}
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
  imageHorizontal: {
    width: 280,
    height: 180,
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
  },

  imageVertical: {
    width: 350,
    height: 220,
    borderRadius: 10,
    marginEnd: 10,
    marginBottom: 15,
  },

  textBoxHorizontal: {
    flex: 1,
    position: 'absolute',
    backgroundColor: null,
    top: 100,
    margin: 15,
  },

  textBoxVertical: {
    flex: 1,
    position: 'absolute',
    backgroundColor: null,
    top: 140,
    margin: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text_light,
  },

  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text_light,
  },
});

SecondhandItemHorizontal.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

SecondhandItemVertical.propTypes = {
  singleItem: PropTypes.object.isRequired,
};

export {ProductList, SecondhandItemHorizontal, SecondhandItemVertical};
