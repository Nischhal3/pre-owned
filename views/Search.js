// Import from react & library
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

// Import from UI Kitten library
import {
  Card,
  Icon,
  Input,
  Layout,
  ListItem,
  Modal,
  Text,
} from '@ui-kitten/components';

// Import from files
import {useMedia} from '../hooks/MediaHooks';
import colors from '../utils/colors';
import NoSearchResultsIcon from '../assets/icons/searching.svg';
import StartSearchIcon from '../assets/icons/startSearch.svg';

// components import
import {FilterIcon, SearchIcon} from '../components/elements/Icons';
import {GalleryItemVertical} from '../components/lists/GalleryItem';
import ModalCheckBox from '../components/elements/CheckBox';
import {AppButton} from '../components/elements/AppButton';

// Import screen orientation
import screenOrientation from '../components/screenOrientation';

const Search = ({navigation}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemPosition, setItemPosition] = useState();
  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(0);
  const [categoryTitle, setCateogryTitle] = useState('');
  const {mediaArray, getMediaByCategory} = useMedia();
  const [mediaByCategory, setMediaByCategory] = useState([]);

  // Screen orientation
  const [orientation, setOrientation] = useState(
    screenOrientation.isPortrait() ? 'portrait' : 'landscape'
  );

  // Filter categories
  const categoryNames = [
    {category: 'Home & Living'},
    {category: 'Electronics'},
    {category: 'Clothing '},
    {category: 'Sports'},
    {category: 'Gaming'},
    {category: 'Others'},
  ];

  const getData = async () => {
    // Storing category values to data depending upon which check-box is clicked
    setCateogryTitle(categoryNames[itemPosition].category);

    itemPosition === 0
      ? setMediaByCategory(
          await getMediaByCategory(categoryNames[itemPosition].category)
        )
      : itemPosition === 1
      ? setMediaByCategory(
          await getMediaByCategory(categoryNames[itemPosition].category)
        )
      : itemPosition === 2
      ? setMediaByCategory(
          await getMediaByCategory(categoryNames[itemPosition].category)
        )
      : itemPosition === 3
      ? setMediaByCategory(
          await getMediaByCategory(categoryNames[itemPosition].category)
        )
      : itemPosition === 4
      ? setMediaByCategory(
          await getMediaByCategory(categoryNames[itemPosition].category)
        )
      : itemPosition === 5
      ? setMediaByCategory(
          await getMediaByCategory(categoryNames[itemPosition].category)
        )
      : setMediaByCategory([]);
  };

  // update filtered list
  const searchProduct = (textToSearch) => {
    setSearch(textToSearch);
    setCateogryTitle('');
    setMediaByCategory([]);

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
    setMediaByCategory([]);
    setSearch('');
    setCateogryTitle('');
  };

  // Setting search to empty string when filter check-box is clicked
  useEffect(() => {
    setSearch('');
    Dimensions.addEventListener('change', () => {
      setOrientation(screenOrientation.isPortrait() ? 'portrait' : 'landscape');
    });
  }, [isChecked]);

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  if (orientation === 'portrait') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          />
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
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : ''}
                />
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
                    categoryNames={categoryNames}
                    setItemPosition={setItemPosition}
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                  />
                  <Layout
                    style={{flexDirection: 'row', backgroundColor: 'transparent'}}
                  >
                    <AppButton
                      title="Apply Filter"
                      appBtnStyle={{
                        marginTop: '5%',
                        width: 185,
                        alignSelf: 'center',
                      }}
                      onPress={() => {
                        setVisible(false);
                        getData();
                      }}
                    />
                  </Layout>
                </Card>
              </Modal>
            </Layout>
          </ListItem>

          {categoryTitle === '' ? (
            <AppButton
              title="No filter set"
              appBtnStyle={{
                marginTop: '-2%',
                width: '40%',
                height: '5%',
                alignSelf: 'center',
                paddingVertical: '2%',
                paddingHorizontal: '5%',
              }}
              onPress={reset}
            />
          ) : (
            <AppButton
              title={`${categoryTitle}`}
              accessoryRight={<Icon name="close" />}
              appBtnStyle={{
                marginTop: '-2%',
                width: '40%',
                height: '5%',
                alignSelf: 'center',
                paddingVertical: '2%',
                paddingHorizontal: '5%',
              }}
              onPress={reset}
            />
          )}

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
            ) : mediaByCategory !== null ? (
              mediaByCategory.map((item) => (
                <GalleryItemVertical
                  navigation={navigation}
                  singleItem={item}
                  key={item.file_id}
                  displayText={true}
                />
              ))
            ) : (
              <Text>{''}</Text>
            )}
            {(filteredData.length === 0 && search !== '') ||
            (categoryTitle !== '' && mediaByCategory.length === 0) ? (
              <Layout
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                }}
              >
                <NoSearchResultsIcon width="120" height="120" />
                <Text
                  style={{
                    fontSize: 24,
                    color: colors.mediumGrey,
                    fontFamily: 'Karla_700Bold',
                    alignSelf: 'center',
                  }}
                >
                  No match!
                </Text>
              </Layout>
            ) : categoryTitle === '' && search.length === 0 ? (
              <StartSearchIcon width="150" height="150" />
            ) : (
              <Text>{''}</Text>
            )}
          </ScrollView>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          />
          <Layout style={{flexDirection: 'row', width: '100%', backgroundColor: colors.background}}>
            <Layout style={{backgroundColor: colors.background, width: '50%'}}>
              <ListItem
                style={{
                  marginTop: 50,
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: colors.background,
                }}
               >
              <Input
                value={search}
                placeholder="Search..."
                style={styles.searchFieldLandscape}
                accessoryLeft={SearchIcon}
                onChangeText={(text) => searchProduct(text)}
              />
              <ListItem
                accessoryRight={FilterIcon}
                onPress={() => setVisible(true)}
                style={{width: 50, backgroundColor: colors.background}}
              />

              <Layout style={styles.modalContainer}>
                <Modal
                  visible={visible}
                  backdropStyle={styles.modalBackdrop}
                  onBackdropPress={() => setVisible(false)}
                >
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : ''}
                  />
                  <Card
                    disabled={true}
                    style={{
                      height: 380,
                      width: '100%',
                      borderRadius: 15,
                      backgroundColor: colors.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Karla_700Bold',
                        alignSelf: 'center',
                        marginBottom: 15,
                        fontSize: 22,
                      }}
                    >
                      Categories
                    </Text>
                    <ModalCheckBox
                      categoryNames={categoryNames}
                      setItemPosition={setItemPosition}
                      setIsChecked={setIsChecked}
                      isChecked={isChecked}
                    />
                    <Layout
                      style={{flexDirection: 'row', backgroundColor: 'transparent'}}
                    >
                      <AppButton
                        title="Apply Filter"
                        appBtnStyle={{
                          width: 150,
                          alignSelf: 'center',
                        }}
                        onPress={() => {
                          setVisible(false);
                          getData();
                        }}
                      />
                    </Layout>
                  </Card>
                </Modal>
              </Layout>
            </ListItem>

            {categoryTitle === '' ? (
              <AppButton
                title="No filter set"
                appBtnStyle={{
                  width: '40%',
                  height: 50,
                  alignSelf: 'center',
                }}
                onPress={reset}
              />
            ) : (
              <AppButton
                title={`${categoryTitle}`}
                accessoryRight={<Icon name="close" />}
                appBtnStyle={{
                  width: '40%',
                  height: 50,
                  alignSelf: 'center',
                }}
                onPress={reset}
              />
            )}
            </Layout>
            <ScrollView
              style={styles.searchImageContainerLandscape}
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
              ) : mediaByCategory !== null ? (
                mediaByCategory.map((item) => (
                  <GalleryItemVertical
                    navigation={navigation}
                    singleItem={item}
                    key={item.file_id}
                    displayText={true}
                  />
                ))
              ) : (
                <Text>{''}</Text>
              )}
              {(filteredData.length === 0 && search !== '') ||
              (categoryTitle !== '' && mediaByCategory.length === 0) ? (
                <Layout
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    marginTop: 75,
                  }}
                >
                  <NoSearchResultsIcon width="120" height="120"/>
                  <Text
                    style={{
                      fontSize: 24,
                      color: colors.mediumGrey,
                      fontFamily: 'Karla_700Bold',
                      alignSelf: 'center',
                    }}
                  >
                    No match!
                  </Text>
                </Layout>
              ) : categoryTitle === '' && search.length === 0 ? (
                <Layout style={{marginTop: 75, backgroundColor: colors.background}}>
                  <StartSearchIcon width="150" height="150"/>
                </Layout>
              ) : (
                <Text>{''}</Text>
              )}
            </ScrollView>
          </Layout>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
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
    margin: '2%',
  },
  modalContainer: {
    minHeight: '10%',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  searchFieldLandscape: {
    width: '70%',
    borderRadius: 15,
    margin: '2%',
    marginRight: 0,
  },
  searchImageContainerLandscape: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
