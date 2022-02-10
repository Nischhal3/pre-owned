import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  ItemGalleryHorizontal,
  ItemGalleryVertical,
} from '../components/ExploreList';
import {container} from '../utils/colors';
import PropTypes from 'prop-types';

const ExploreScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ItemGalleryHorizontal navigation={navigation} />
      <ItemGalleryVertical navigation={navigation} />
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

ExploreScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ExploreScreen;
