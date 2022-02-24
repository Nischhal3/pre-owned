import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  Button,
  Card,
  CheckBox,
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
  console.log('position', itemPosition);

  const reset = () => {
    setVisible(false);
    setItemPosition(null);
    setSearch('');
  };

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
              <ModalCheckBox setItemPosition={setItemPosition} />
              <Layout
                style={{flexDirection: 'row', backgroundColor: 'transparent'}}
              >
                <AppButton
                  title="Apply Filter"
                  appBtnStyle={{marginTop: 20, width: 130}}
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
        }}
        onPress={reset}
      />
      <ScrollView style={styles.searchImageContainer}>
        {search !== '' ? (
          filteredData.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : itemPosition === 0 ? (
          home.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : itemPosition === 1 ? (
          electronics.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : itemPosition === 2 ? (
          clothing.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : itemPosition === 3 ? (
          sports.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : itemPosition === 4 ? (
          gaming.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : itemPosition === 5 ? (
          others.map((item) => (
            <GalleryItemVertical
              navigation={navigation}
              singleItem={item}
              key={item.file_id}
              displayText={true}
            />
          ))
        ) : (
          <Text> {''}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchImageContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
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
