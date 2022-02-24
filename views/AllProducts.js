import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/MediaHooks';
import {PlainListItem} from '../components/lists';

const AllProducts = ({navigation}) => {
  const {mediaArray} = useMedia();

  // Sorting items by recently added date
  mediaArray.sort((a, b) => a.time_added < b.time_added);

  return (
    <SafeAreaView>
      <List
        data={mediaArray}
        contentContainerStyle={styles.container}
        horizontal={false}
        ItemSeparatorComponent={Divider}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <PlainListItem
            navigation={navigation}
            singleItem={item}
            displayText={true}
          />
        )}
      ></List>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    backgroundColor: colors.primary,
  },
});

AllProducts.propTypes = {
  navigation: PropTypes.object,
};

export default AllProducts;
