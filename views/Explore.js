import {Button, Layout} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  GalleryListHorizontal,
  GalleryListVertical,
} from '../components/ExploreList';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {PointRightArrow} from '../components/elements/Icons';

// Return explore screen
const ExploreScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.horizontalGallery}>
        <Button
          onPress={() => {
            navigation.navigate('All products');
          }}
          size={'giant'}
          style={{justifyContent: 'space-between'}}
          appearance="ghost"
          accessoryRight={PointRightArrow}
        >
          All products
        </Button>
        <GalleryListHorizontal navigation={navigation} />
      </Layout>

      <Layout style={styles.verticalGallery}>
        <Button
          onPress={() => {
            navigation.navigate('Popular now');
          }}
          size={'giant'}
          style={{justifyContent: 'space-between'}}
          appearance="ghost"
          accessoryRight={PointRightArrow}
        >
          Popular now
        </Button>
        <GalleryListVertical navigation={navigation} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.container,
  },

  horizontalGallery: {
    backgroundColor: colors.container,
    marginTop: 10,
  },

  verticalGallery: {
    flex: 1,
    marginTop: -10,
    backgroundColor: colors.container,
  },
});

ExploreScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ExploreScreen;
