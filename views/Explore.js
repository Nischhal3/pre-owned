import { Icon, Input, Text } from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ItemGallery from '../components/ProductList';


const LocationIcon = (props) => (
  <Icon name='navigation-2-outline' {...props} />
);

const SearchIcon = (props) => (
  <Icon name='search-outline' {...props} />
);


const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
  <View style={styles.topBars}>
    <Input
        style={styles.inputs}
        placeholder='Location'
        accessoryLeft={LocationIcon} />
    <Input
        style={styles.inputs}
        placeholder='Search'
        accessoryLeft={SearchIcon} />
  </View>


    <View style={styles.gallery}>
      <View style={styles.titleBar}>
    <Text style={styles.title}>Recently added</Text>
    <Text style={styles.btnMore}>See all</Text>
    </View>
    <ItemGallery />
    </View>


    <View style={styles.gallery}>
    <View style={styles.titleBar}>
    <Text style={styles.title}>Popular now</Text>
    <Text style={styles.btnMore}>See all</Text>
    </View>
    <ItemGallery />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  topBars: {
    flex: 5,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inputs: {
    marginStart: 5,
    width:'45%',
    borderRadius: 15,
  },

  gallery: {
    flex: 18,
    marginStart: 15,
  },

  titleBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 20,
  },


  title: {
    fontSize: 24,
    fontWeight: '600',
  },

  btnMore: {
    fontSize: 16,
    padding: 6,
    fontWeight: '600',
  },
});


export default ExploreScreen;
