import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Card,
  Icon,
  Input,
  Layout,
  ListItem,
  Modal,
  Text,
} from '@ui-kitten/components';
import {useMedia} from '../hooks/MediaHooks';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import {FilterIcon, SearchIcon} from '../components/elements/Icons';
import {ScrollView} from 'react-native-gesture-handler';
import {GalleryItemVertical} from '../components/lists/GalleryItem';
import ModalCheckBox from '../components/elements/CheckBox';
import {AppButton} from '../components/elements/AppButton';

const Search = ({navigation}) => {
  const {mediaArray, home, electronics, clothing, sports, gaming, others} =
    useMedia();
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemPosition, setItemPosition] = useState();
  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(0);

  // Storing category values to data depending upon which check-box is clicked
  const data =
    itemPosition === 0
      ? home
      : itemPosition === 1
      ? electronics
      : itemPosition === 2
      ? clothing
      : itemPosition === 3
      ? sports
      : itemPosition === 4
      ? gaming
      : itemPosition === 5
      ? others
      : null;

  // update filtered list
  const searchProduct = (textToSearch) => {
    setSearch(textToSearch);
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

  // Clearing filter and search
  const reset = () => {
    setVisible(false);
    setItemPosition(null);
    setSearch('');
  };

  // Setting search to empty string when filter check-box is clicked
  useEffect(() => {
    setSearch('');
  }, [isChecked]);

  // We need to add it ?
  // useFocusEffect(
  //   useCallback(() => {
  //     return () => reset();
  //   }, [])
  // );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background,
      }}
    >
      <ListItem
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: colors.background,
        }}
      >
        <Input
          value={search}
          placeholder="Search..."
          style={styles.searchField}
          accessoryLeft={SearchIcon}
          onChangeText={(text) => searchProduct(text)}
        />
        <ListItem
          accessoryRight={FilterIcon}
          onPress={() => setVisible(true)}
          style={{flex: 1, backgroundColor: null}}
        />

        <Layout style={styles.modalContainer}>
          <Modal
            visible={visible}
            backdropStyle={styles.modalBackdrop}
            onBackdropPress={() => setVisible(false)}
          >
            <Card
              disabled={true}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 15,
                backgroundColor: colors.primary,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Karla_700Bold',
                  alignSelf: 'center',
                  marginBottom: 20,
                  fontSize: 22,
                }}
              >
                Categories
              </Text>
              <ModalCheckBox
                setItemPosition={setItemPosition}
                setIsChecked={setIsChecked}
                isChecked={isChecked}
              />
              <Layout
                style={{flexDirection: 'row', backgroundColor: 'transparent'}}
              >
                <AppButton
                  title="Apply Filter"
                  appBtnStyle={{marginTop: 20, width: 180, alignSelf: 'center'}}
                  onPress={() => setVisible(false)}
                />
              </Layout>
            </Card>
          </Modal>
        </Layout>
      </ListItem>
      <AppButton
        title="Filter"
        accessoryRight={<Icon name="close" />}
        appBtnStyle={{
          marginTop: -10,
          width: 100,
          height: 40,
          alignSelf: 'flex-end',
          paddingVertical: 5,
        }}
        onPress={reset}
      />
      <ScrollView
        style={styles.searchImageContainer}
        contentContainerStyle={{alignItems: 'center'}}
      >
        {search !== '' ? (
          filteredData.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : data !== null ? (
          data.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : (
          <Text>Search</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchImageContainer: {
    flex: 1,
    width: '100%',
    marginTop: '5%',
    backgroundColor: colors.background,
  },
  searchField: {
    flex: 10,
    borderRadius: 15,
    margin: 5,
  },
  modalContainer: {
    minHeight: 70,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
