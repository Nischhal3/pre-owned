import { Text } from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { ItemGalleryHorizontal, ItemGalleryVertical } from '../components/ExploreList';
import colors from '../utils/colors';



const ExploreScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} onPress={() => {
          navigation.navigate('Message');
        }}>Recently added</Text>
          <ItemGalleryHorizontal />
          <Text style={styles.title} onPress={() => {
          navigation.navigate('Message');
        }}>Popular now</Text>
          <ItemGalleryVertical />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.container,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    margin: 20,
    color: colors.text_dark,
  },
});



export default ExploreScreen;
