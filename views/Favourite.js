import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// Import from UI Kitten Library
import {List} from '@ui-kitten/components';

// Styling import
import {colors} from '../utils';

// Api import
import {getMediaById, useFavourite} from '../hooks/MediaHooks';

// Import from files
import {getToken} from '../hooks/CommonFunction';
import {PlainListItem} from '../components/lists';
import {ItemSeparator} from '../components/elements/ItemSeparator';
import {MainContext} from '../contexts/MainContext';

const Favourite = ({navigation}) => {
  const {getFavourtiesList} = useFavourite();
  const [favorites, setFavourites] = useState([]);
  const [favoriteList, setFavouriteList] = useState([]);
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
      favorites.map(async (favorite) => {
        const response = await getMediaById(favorite.file_id);
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
  }, [favorites]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <List
        data={favoriteList}
        contentContainerStyle={styles.container}
        horizontal={false}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <PlainListItem
            navigation={navigation}
            singleItem={item}
            displayText={true}
            showMyMedia={false}
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
export default Favourite;
