// Import from React
import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Import from files
import {useMedia} from '../../hooks/MediaHooks';

// mainContext import
import {MainContext} from '../../contexts/MainContext';

// components import
import {ItemSeparator} from '../../components/elements/ItemSeparator';
import {PlainListItem} from '../../components/lists';
import {AppButton} from '../../components/elements/AppButton';

// utils import
import colors from '../../utils/colors';

// ui-kittens import
import {Layout, List, Text} from '@ui-kitten/components';

// assets import
import SVGIcon from '../../assets/icons/no-content.svg';

const MyListings = ({navigation, showMyMedia = false}) => {
  const {mediaArray} = useMedia(showMyMedia);
  const {user} = useContext(MainContext);

  // Filtering media added by logged in user
  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);

  // Sorting media by recently added first
  myMedia.sort((a, b) => a.time_added < b.time_added);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      {myMedia.length == 0 ? (
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
            You have no listings yet.
          </Text>
          <AppButton
            title="Start Selling"
            appBtnStyle={{top: 20}}
            onPress={() => {
              navigation.navigate('Add Listing');
            }}
          />
        </Layout>
      ) : (
        <List
          contentContainerStyle={styles.container}
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

MyListings.propTypes = {
  navigation: PropTypes.object,
  showMyMedia: PropTypes.bool,
};

export default MyListings;
