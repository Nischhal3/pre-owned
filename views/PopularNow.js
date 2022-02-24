import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import PlainListItem from '../components/lists/PlainListItem';
import {useFavourite, useMedia} from '../hooks/MediaHooks';
import ItemSeparator from '../components/elements/ItemSeparator';

// TODO fetch items from server, item fetch to be added in API hooks
const PopularNow = ({navigation}) => {
  const {mediaArray} = useMedia();
  const {getFavourtiesByFileId} = useFavourite();

  // const getFavourites = (id) => {
  //   console.log(id);
  //   return getFavourtiesByFileId(id).length;
  // };

  // mediaArray.sort(
  //   (a, b) => getFavourites(a.file_id) < getFavourites(b.file_id)
  // );

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
            // file={getFavourites(item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

PopularNow.propTypes = {
  navigation: PropTypes.object,
};

export default PopularNow;
