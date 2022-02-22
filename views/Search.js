import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Input, ListItem} from '@ui-kitten/components';
import {useMedia} from '../hooks/MediaHooks';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {FilterIcon, SearchIcon} from '../components/elements/Icons';
import {ScrollView} from 'react-native-gesture-handler';
import {GalleryItemVertical} from '../components/lists/GalleryItem';

const Search = ({navigation}) => {
  const {mediaArray} = useMedia();
  const [filteredData, setFilteredData] = useState([]);

  // update filtered list
  const searchProduct = (textToSearch) => {
    try {
      if (textToSearch === '') {
        setFilteredData([]);
      } else {
        const newData = mediaArray.filter((i) =>
          i.title.toLowerCase().includes(textToSearch.toLowerCase())
        );
        setFilteredData(newData);
      }
    } catch (e) {
      console.log('Cant set filtered data', e);
    }
  };

  // Open modal window for filtering by category
  const toggleModal = () => {
    alert('modal opened');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary,
      }}
    >
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
          onPress={() => {
            toggleModal();
          }}
          style={{flex: 1, backgroundColor: null}}
        />
      </ListItem>
      <ScrollView style={styles.searchImageContainer}>
        {filteredData.map((item) => (
          <GalleryItemVertical
            navigation={navigation}
            singleItem={item}
            key={item.file_id}
            displayText={true}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchImageContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
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
