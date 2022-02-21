import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Divider, Input, List, ListItem} from '@ui-kitten/components';
import {useMedia} from '../hooks/MediaHooks';
import PlainListItem from '../components/lists/PlainListItem';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {FilterIcon} from '../components/elements/Icons';

const Search = (navigation) => {
  const {mediaArray} = useMedia();

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <ListItem
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: colors.primary,
        }}
      >
        <Input placeholder="Search..." style={styles.searchField} />
        <ListItem
          accessoryRight={FilterIcon}
          style={{flex: 1, backgroundColor: null}}
        />
      </ListItem>
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

  searchField: {
    flex: 10,
    borderRadius: 15,
    margin: 5,
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
