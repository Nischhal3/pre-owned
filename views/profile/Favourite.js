// Import from React
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten
import {Layout, List, Text} from '@ui-kitten/components';

// Api import
import {getMediaById, useFavourite} from '../../hooks/MediaHooks';

// Import from files
import {colors} from '../../utils';
import {MainContext} from '../../contexts/MainContext';
import SVGIcon from '../../assets/icons/no-content.svg';
import {getToken} from '../../hooks/CommonFunction';

// components import
import {FavouriteList} from '../../components/lists';
import {ItemSeparator} from '../../components/elements/ItemSeparator';
import {AppButton} from '../../components/elements/AppButton';

const Favourite = ({navigation}) => {
  const {getFavourtiesList} = useFavourite();
  const [favourites, setFavourites] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);
  const {update} = useContext(MainContext);

  // Fetching  user favourite list
  const list = async () => {
    const token = await getToken();
    const response = await getFavourtiesList(token);
    setFavourites(response);
  };

  // Mapping and storing all the favourites file via file id on the main media list
  const setList = async () => {
    const media = await Promise.all(
      favourites.map(async (favourite) => {
        const response = await getMediaById(favourite.file_id);
        return response;
      })
    );

    setFavouriteList(media);
  };

  // Updating favourite list if user likes or dislikes the media
  useEffect(() => {
    list();
  }, [update]);

  // Updating list whenever there is change in favourite
  useEffect(() => {
    setList();
  }, [favourites]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      {favouriteList.length == 0 ? (
        <Layout
          style={{
            backgroundColor: 'transparent',
            marginTop: '50%',
            alignItems: 'center',
          }}
        >
          <SVGIcon width="50" height="50" />
          <Text
            category="s1"
            style={{
              fontFamily: 'Karla',
              fontSize: 18,
              alignSelf: 'center',
              paddingTop: 20,
            }}
          >
            Your favorite list is empty
          </Text>
          <AppButton
            title="Browse products"
            appBtnStyle={{top: 20}}
            onPress={() => {
              navigation.navigate('All products');
            }}
          />
        </Layout>
      ) : (
        <List
          data={favouriteList}
          contentContainerStyle={styles.container}
          horizontal={false}
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <FavouriteList navigation={navigation} singleItem={item} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    paddingBottom: '10%',
  },
});

Favourite.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default Favourite;
