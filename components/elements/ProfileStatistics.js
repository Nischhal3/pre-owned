// Import from React and library
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';

// Import from UI Kitten library
import {Layout, Text} from '@ui-kitten/components';

// Import from files
import colors from '../../utils/colors';
import {useFavourite, useMedia} from '../../hooks/MediaHooks';
import {getToken} from '../../hooks/CommonFunction';
import {getMessagesList} from '../../hooks/MessageHook';
import {MainContext} from '../../contexts/MainContext';

const Statistics = () => {
  const {user} = useContext(MainContext);
  const {mediaArray} = useMedia();
  const {getFavourtiesList} = useFavourite();
  const [favourites, setFavourites] = useState([]);
  const {updateFavourite} = useContext(MainContext);
  const [messages, setMessages] = useState([]);
  const {updateMessage} = useContext(MainContext);

  // Get count for users posts
  const myPosts = mediaArray.filter((item) => item.user_id === user.user_id);

  // Get count for posts liked by user
  const myLikes = async () => {
    const token = await getToken();
    const response = await getFavourtiesList(token);
    setFavourites(response);
  };

  // Get count of messages sent by user
  const myMessages = async () => {
    const token = await getToken();
    const response = await getMessagesList(token);
    // console.log(response);
    setMessages(response);
  };

  // update statistics views
  useEffect(() => {
    myLikes();
    myMessages();
  }, [updateFavourite, updateMessage]);

  return (
    <Layout style={styles.statisticsWrapper}>
      <Text style={styles.activity}>Activity</Text>
      <Layout style={styles.icons}>
        <Image source={require('../../assets/icons/box_1mdpi.png')} />
        <Image source={require('../../assets/icons/heart_1mdpi.png')} />
        <Image source={require('../../assets/icons/bubble_1mdpi.png')} />
      </Layout>
      <Layout style={styles.statisticsView}>
        <Text style={styles.numbers}>{myPosts.length}</Text>
        <Text style={styles.numbers}>{favourites.length}</Text>
        <Text style={styles.numbers}>{messages.length}</Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  statisticsWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  activity: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Karla_700Bold',
    marginTop: '5%',
    alignSelf: 'center',
  },
  icons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colors.background,
  },
  statisticsView: {
    flex: 1,
    flexDirection: 'row',
    bottom: '8%',
    justifyContent: 'space-evenly',
    backgroundColor: colors.background,
  },
  numbers: {
    marginHorizontal: '10%',
    fontFamily: 'Karla_700Bold',
  },
});

export default Statistics;
