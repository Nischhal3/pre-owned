import React, {useContext} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import PlainListItem from '../components/lists/PlainListItem';

const MyListing = ({navigation, showMyMedia = false}) => {
  const {mediaArray} = useMedia(showMyMedia);
  const {user} = useContext(MainContext);

  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);
  myMedia.sort((a, b) => a.time_added < b.time_added);

  return (
    <SafeAreaView>
      <FlatList
        data={myMedia}
        keyExtractor={(item) => item.file_id.toString()}
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

MyListing.propTypes = {
  navigation: PropTypes.object,
  showMyMedia: PropTypes.bool,
};

export default MyListing;
