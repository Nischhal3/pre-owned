// Import from react & libraries
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

// Import from UI Kitten library
import {List} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import PlainListItem from '../components/lists/PlainListItem';
import {useMedia} from '../hooks/MediaHooks';
import {ItemSeparator} from '../components/elements/ItemSeparator';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

// TODO fetch items from server, item fetch to be added in API hooks
const PopularNow = ({navigation}) => {
  const {mediaArray} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  mediaArray.sort((a, b) => a.favCount < b.favCount);

  // useFocusEffect(() => {
  //   useCallback(() => {
  //     return () => {
  //       setUpdate(update + 1);
  //     };
  //   }, []);
  // });

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

PopularNow.propTypes = {
  navigation: PropTypes.object,
};

export default PopularNow;
