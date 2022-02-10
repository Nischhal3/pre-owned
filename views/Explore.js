import {Text} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  ItemGalleryHorizontal,
  ItemGalleryVertical,
} from '../components/ExploreList';
import colors from '../utils/colors';
import PropTypes from 'prop-types';

const ExploreScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => {
          navigation.navigate('Recently added');
        }}
      >
        Recently added
      </Text>
      <ItemGalleryHorizontal navigation={navigation}/>
      <Text
        style={styles.title}
        onPress={() => {
          navigation.navigate('Popular now');
        }}
      >
        Popular now
      </Text>
      <ItemGalleryVertical navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.container,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    margin: 20,
    color: colors.text_dark,
  },
});

ExploreScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ExploreScreen;
