import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {PlainListItem} from '../components/ListItem';
import colors from '../utils/colors';
import PropTypes from 'prop-types';

const products = [
  {
    key: '0',
    title: 'Carbinet for sale',
    price: '€45',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1919',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Kittens',
    price: '9e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1920',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Annoying cat',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '3',
    title: 'Annoying cat',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '4',
    title: 'Annoying cat',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
  {
    key: '5',
    title: 'Annoying cat',
    price: '5e',
    thumbnails: {
      w160: 'http://placekitten.com/2048/1921',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

// TODO fetch items from server, item fetch to be added in API hooks
const RecentlyAdded = ({navigation}) => {
  return (
    <SafeAreaView>
      <List
        data={products}
        contentContainerStyle={styles.containerVertical}
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
  containerVertical: {
    width: '100%',
    padding: 20,
    backgroundColor: colors.container,
  },
});

RecentlyAdded.propTypes = {
  navigation: PropTypes.object,
};

export default RecentlyAdded;
