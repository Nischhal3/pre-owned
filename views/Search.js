import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, List, ListItem} from '@ui-kitten/components';
import {useMedia} from '../hooks/MediaHooks';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {FilterIcon, SearchIcon} from '../components/elements/Icons';
import PlainListItem from '../components/lists/PlainListItem';

const Search = ({navigation}) => {
  const {mediaArray} = useMedia();
  const [filteredData, setFilteredData] = useState([]);

  const searchProduct = (textToSearch) => {
    try {
      const newData = mediaArray.filter((i) =>
        i.title.toLowerCase().includes(textToSearch.toLowerCase())
      );
      setFilteredData(newData);
    } catch (e) {
      console.log('Cant set filtered data', e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <ListItem
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: colors.primary,
        }}
      >
        <Input
          placeholder="Search..."
          style={styles.searchField}
          accessoryLeft={SearchIcon}
          onChangeText={(text) => searchProduct(text)}
        />
        <ListItem
          accessoryRight={FilterIcon}
          style={{flex: 1, backgroundColor: null}}
        />
      </ListItem>

      {filteredData.map((item) => (
        <PlainListItem
          navigation={navigation}
          singleItem={item}
          displayText={true}
          key={item.file_id}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


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
