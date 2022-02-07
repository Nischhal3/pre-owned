import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { ButtonSmall } from '../components/elements/AppButton';
import { ItemGalleryHorizontal, ItemGalleryVertical } from '../components/ExploreList';
import {container} from '../utils/colors';



const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
          <ItemGalleryHorizontal />
          <ItemGalleryVertical />
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
