// Import from react & libraries
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten library
import {List} from '@ui-kitten/components';

// Import from files
import colors from '../../utils/colors';
import {useMedia} from '../../hooks/MediaHooks';

// components import
import {PlainListItem} from '../../components/lists';
import {ItemSeparator} from '../../components/elements/ItemSeparator';

const AllProducts = ({navigation, onPress}) => {
  const {mediaArray} = useMedia();

  // Sorting items by recently added date
  mediaArray.sort((a, b) => a.time_added < b.time_added);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <List
        data={mediaArray}
        contentContainerStyle={styles.container}
        horizontal={false}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <PlainListItem
            navigation={navigation}
            singleItem={item}
            displayText={true}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    paddingBottom: '10%',
  },
});

AllProducts.propTypes = {
  navigation: PropTypes.object,
};

export default AllProducts;
