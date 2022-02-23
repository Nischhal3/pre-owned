import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import PlainListItem from '../components/lists/PlainListItem';
import {useFavourite, useMedia} from '../hooks/MediaHooks';

// TODO fetch items from server, item fetch to be added in API hooks
const PopularNow = ({navigation}) => {
  const {mediaArray} = useMedia();
  const {getFavourtiesByFileId} = useFavourite();
  const [likes, setLikes] = useState(new Array(mediaArray.length).fill(''));

  const file = mediaArray.map((item) => {
    console.log(item.file_id);
  });

  const likeData = getFavourtiesByFileId(file);
  setLikes(likeData);

  console.log(likes.length);

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

PopularNow.propTypes = {
  navigation: PropTypes.object,
};

export default PopularNow;
