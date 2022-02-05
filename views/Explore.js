import { Text } from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ItemGallery from '../components/ProductList';


const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Recently added</Text>
          <ItemGallery />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    margin: 20,
  },
});


export default ExploreScreen;
