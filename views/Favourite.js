// Import from React
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten
import {List} from '@ui-kitten/components';

// Import from files
import {colors} from '../utils';
import {getMediaById, useFavourite} from '../hooks/MediaHooks';
import {getToken} from '../hooks/CommonFunction';
import {FavouriteList} from '../components/lists';
import {ItemSeparator} from '../components/elements/ItemSeparator';
import {MainContext} from '../contexts/MainContext';

const Favourite = ({navigation}) => {
  const {getFavourtiesList} = useFavourite();
  const [favourites, setFavourites] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);
  const {updateFavourite} = useContext(MainContext);

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
  }, [updateFavourite]);

  // Updating list whenever there is change in favourite
  useEffect(() => {
    setList();
  }, [favourites]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

Favourite.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default Favourite;
