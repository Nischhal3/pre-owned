import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import PlainListItem from '../components/Lists/PlainListItem';

const products = [
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

// TODO fetch items from server, item fetch to be added in API hooks
const PopularNow = ({navigation}) => {
  return (
    <SafeAreaView>
      <List
        data={products}
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

PopularNow.propTypes = {
  navigation: PropTypes.object,
};

export default PopularNow;
