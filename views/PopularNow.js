import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import PlainListItem from '../components/lists/PlainListItem';
import {useFavourite, useMedia} from '../hooks/MediaHooks';
import {ItemSeparator} from '../components/elements/ItemSeparator';

// TODO fetch items from server, item fetch to be added in API hooks
const PopularNow = ({navigation}) => {
  const {mediaArray} = useMedia();
  const {getFavourtiesByFileId} = useFavourite();
  const [likes, setLikes] = useState(new Array(mediaArray.length).fill(''));

  const file = mediaArray.map((item) => {
    return item.file_id;
  });

  console.log(file);

  const handleOnChange = (position) => {
    try {
      const data = getFavourtiesByFileId(file);
      const updatedLikeData = data.map((item, index) =>
        index === position ? !item : item
      );
      setLikes(data);
    } catch (e) {
      console.log('Filter update failed', e);
    }
  };

  console.log(likes.length);

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
    marginTop: 20,
  },
});

PopularNow.propTypes = {
  navigation: PropTypes.object,
};

export default PopularNow;
