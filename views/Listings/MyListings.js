// Import from React
import React, {useContext} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import PropTypes from 'prop-types';

// Import from files
import {useMedia} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';
import ItemSeparator from '../../components/elements/ItemSeparator';
import colors from '../../utils/colors';
import {PlainListItem} from '../../components/lists';

const MyListings = ({navigation, showMyMedia = false}) => {
  const {mediaArray} = useMedia(showMyMedia);
  const {user} = useContext(MainContext);

  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);
  myMedia.sort((a, b) => a.time_added < b.time_added);

  return (
    <SafeAreaView>
      <FlatList
        style={{backgroundColor: colors.primary}}
        data={myMedia}
        keyExtractor={(item) => item.file_id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => (
          <PlainListItem
            navigation={navigation}
            singleItem={item}
            showMyMedia={true}
          />
        )}
      />
    </SafeAreaView>
  );
};

MyListings.propTypes = {
  navigation: PropTypes.object,
  showMyMedia: PropTypes.bool,
};

export default MyListings;
