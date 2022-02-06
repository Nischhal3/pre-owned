import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ItemGallery from '../components/ProductList';
import {container} from '../utils/colors';


const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
          <ItemGallery />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: container,

  },
});


export default ExploreScreen;
