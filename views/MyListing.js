import React, {useContext, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Divider, List, Text} from '@ui-kitten/components';
import {PlainListItem} from '../components/ListItem';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import {ListItem} from 'react-native-elements';

// const myProducts = [
//   {
//     key: '0',
//     title: 'Cabinet for sale',
//     published: '1 day ago',
//     price: '€45',
//     thumbnails: {
//       w160: 'http://placekitten.com/2048/1919',
//     },
//     filename: 'http://placekitten.com/2048/1920',
//   },
//   {
//     key: '1',
//     title: 'Kittens',
//     published: '1 day ago',
//     price: '9e',
//     thumbnails: {
//       w160: 'http://placekitten.com/2048/1920',
//     },
//     filename: 'http://placekitten.com/2041/1922',
//   },
//   {
//     key: '2',
//     title: 'Annoying cat',
//     published: '1 day ago',
//     price: '5e',
//     thumbnails: {
//       w160: 'http://placekitten.com/2048/1921',
//     },
//     filename: 'http://placekitten.com/2039/1920',
//   },
//   {
//     key: '3',
//     title: 'Annoying cat',
//     published: '1 day ago',
//     price: '5e',
//     thumbnails: {
//       w160: 'http://placekitten.com/2048/1921',
//     },
//     filename: 'http://placekitten.com/2039/1920',
//   },
//   {
//     key: '4',
//     title: 'Annoying cat',
//     published: '1 day ago',
//     price: '5e',
//     thumbnails: {
//       w160: 'http://placekitten.com/2048/1921',
//     },
//     filename: 'http://placekitten.com/2039/1920',
//   },
//   {
//     key: '5',
//     title: 'Annoying cat',
//     published: '1 day ago',
//     price: '5e',
//     thumbnails: {
//       w160: 'http://placekitten.com/2048/1921',
//     },
//     filename: 'http://placekitten.com/2039/1920',
//   },
// ];
const MyListing = ({navigation, myFilesOnly}) => {
  const {mediaArray} = useMedia();
  const {user} = useContext(MainContext);

  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);
  console.log('Json', myMedia);

  return (
    <SafeAreaView>
      <FlatList
        data={mediaArray}
        keyExtractor={(item) => item.file_id.toString()}
        renderItem={({item}) => (
          <ListItem
            navigation={navigation}
            singleMedia={item}
            myFilesOnly={myFilesOnly}
          />
        )}
      />
      {/* <List
        data={myProducts}
        contentContainerStyle={styles.container}
        horizontal={false}
        ItemSeparatorComponent={Divider}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <PlainListItem navigation={navigation} singleItem={item} />
        )}
      ></List> */}
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
