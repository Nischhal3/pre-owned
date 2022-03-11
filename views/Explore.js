// Import from react & libraries
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten library
import {Layout} from '@ui-kitten/components';

// Import from files
import {
  GalleryListHorizontal,
  GalleryListVertical,
  GalleryListVerticalLandscape,
} from '../components/lists/ExploreList';
import colors from '../utils/colors';
import ExploreTitle from '../components/ExploreTitle';

// Import screen orientation
import screenOrientation from '../components/screenOrientation';

// Return explore screen
const Explore = ({navigation}) => {
  // Screen orientation
  const [orientation, setOrientation] = useState(
    screenOrientation.isPortrait() ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(screenOrientation.isPortrait() ? 'portrait' : 'landscape');
    });
  }, []);

  if (orientation === 'portrait') {
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
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <GalleryListVerticalLandscape navigation={navigation} />
          </Layout>
        </ScrollView>
      </SafeAreaView>
    );
  }
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

Explore.propTypes = {
  navigation: PropTypes.object,
};

export default Explore;
