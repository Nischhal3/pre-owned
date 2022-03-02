import React, {useContext, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import PlainListItem from '../components/lists/PlainListItem';
import {useMedia} from '../hooks/MediaHooks';
import {ItemSeparator} from '../components/elements/ItemSeparator';
import {MainContext} from '../contexts/MainContext';

// TODO fetch items from server, item fetch to be added in API hooks
const PopularNow = ({navigation}) => {
  const {mediaArray} = useMedia();
  const {update, updateFavourite} = useContext(MainContext);
  const [sortedList, setSortedList] = useState([]);

  const updateList = () => {
    const list = mediaArray.sort((a, b) => a.favCount < b.favCount);
    setSortedList(list);
  };

  useEffect(() => {
    updateList();
  }, [mediaArray]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <List
        data={sortedList}
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
