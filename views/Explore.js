// Import from react & libraries
import React, {useCallback, useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten library
import {Layout} from '@ui-kitten/components';

// Import from files
import {
  GalleryListHorizontal,
  GalleryListVertical,
} from '../components/ExploreList';
import colors from '../utils/colors';
import ExploreTitle from '../components/ExploreTitle';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

// Return explore screen
const ExploreScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.horizontalGallery}>
        <ExploreTitle
          onPress={() => {
            navigation.navigate('All products');
          }}
          title="All products"
        />
        <GalleryListHorizontal navigation={navigation} />
      </Layout>

      <Layout style={styles.verticalGallery}>
        <ExploreTitle
          onPress={() => {
            navigation.navigate('Popular now');
          }}
          title="Popular now"
        />
        <GalleryListVertical navigation={navigation} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
  },

  horizontalGallery: {
    backgroundColor: colors.background,
    marginTop: 10,
  },

  verticalGallery: {
    flex: 1,
    marginTop: -10,
    backgroundColor: colors.background,
  },
});

ExploreScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ExploreScreen;
