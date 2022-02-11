import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Divider, List} from '@ui-kitten/components';
import {PlainListItem} from '../components/ListItem';
import colors from '../utils/colors';
import PropTypes from 'prop-types';

const myProducts = [
  {
    key: '0',
    title: 'Cabinet for sale',
    published: '1 day ago',
    price: '€45',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1919',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Kittens',
    published: '1 day ago',
    price: '9e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1920',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Annoying cat',
    published: '1 day ago',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '3',
    title: 'Annoying cat',
    published: '1 day ago',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '4',
    title: 'Annoying cat',
    published: '1 day ago',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '5',
    title: 'Annoying cat',
    published: '1 day ago',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];
const MyListing = ({navigation}) => {
  return (
    <SafeAreaView>
      <List
        data={myProducts}
        contentContainerStyle={styles.container}
        horizontal={false}
        ItemSeparatorComponent={Divider}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <PlainListItem navigation={navigation} singleItem={item} />
        )}
      ></List>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    backgroundColor: colors.primary,
  },
});

MyListing.propTypes = {
  navigation: PropTypes.object,
};

export default MyListing;
