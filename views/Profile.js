import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, ActivityIndicator} from 'react-native';
import {
  Card,
  Layout,
  Button,
  Text,
  Avatar,
  Divider,
} from '@ui-kitten/components';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import {uploadsUrl} from '../utils/url';
import {getFilesByTag, useFavourite, useMedia} from '../hooks/MediaHooks';
import {getUserById} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {ProfileSeparator} from '../components/elements/ItemSeparator';
import {getToken} from '../hooks/CommonFunction';

const Profile = ({route}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState();
  const [hasAvatar, setHasAvatar] = useState(false);
  const userIdParam = route.params?.profileParam ?? user.user_id;
  const [userProfile, setUserProfile] = useState({});
  const {mediaArray} = useMedia();
  const {getFavourtiesList} = useFavourite();
  const [favourites, setFavourites] = useState([]);
  const {updateFavourite} = useContext(MainContext);

  // Show user count for user posts
  const myPosts = mediaArray.filter(
    (item) => item.user_id === userProfile.user_id
  );

  // Get count for posts liked by user
  const myLikes = async () => {
    const token = await getToken();
    const response = await getFavourtiesList(token);
    setFavourites(response);
  };

  useEffect(() => {
    myLikes();
  }, [favourites]);

  const logout = async () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const fetchAvatar = async () => {
    try {
      const info = await getUserById(userIdParam);
      setUserProfile(info);
      const avatarArray = await getFilesByTag('avatar_' + userIdParam);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      if (avatar != null) {
        setHasAvatar(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
    // console.log('profile', user);
    // console.log("param", userIdParam);
    // console.log("user", userProfile);
  }, []);

  return (
    <Layout style={styles.container}>
      <Image
        style={styles.backgroundImg}
        source={require('../assets/backgrounds/profile_background.png')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Layout style={styles.profileWrapper}>
        {hasAvatar ? (
          <Avatar style={styles.avatar} source={{uri: avatar}} shape="round" />
        ) : (
          <Avatar
            style={styles.avatar}
            source={require('../assets/backgrounds/Avatar.png')}
            shape="round"
          />
        )}
        <Text style={styles.username}>{userProfile.username}</Text>
        <ProfileSeparator />
        <Text style={styles.bio}>Bio</Text>
        {userProfile.full_name ? (
          <Text style={styles.description}>{userProfile.full_name}</Text>
        ) : (
          <Text style={styles.description}>User description not set.</Text>
        )}
        <ProfileSeparator />
      </Layout>

      <Layout style={styles.statisticsWrapper}>
        <Text style={styles.activity}>Activity</Text>
        <Layout style={styles.icons}>
          <Image source={require('../assets/icons/box_1mdpi.png')} />
          <Image source={require('../assets/icons/heart_1mdpi.png')} />
          <Image source={require('../assets/icons/bubble_1mdpi.png')} />
        </Layout>
        <Layout style={styles.calculations}>
          <Text style={styles.numbers}>{myPosts.length}</Text>
          <Text style={styles.numbers}>{favourites.length}</Text>
          <Text style={styles.numbers}>3</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
  },
  profileWrapper: {
    flex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: '10%',
  },
  username: {
    marginTop: '53%',
    fontSize: 26,
    fontFamily: 'Karla_400Regular',
  },
  bio: {
    marginTop: '5%',
    fontSize: 20,
    fontFamily: 'Karla_700Bold',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    maxWidth: '80%',
    fontFamily: 'Karla_400Regular',
  },
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
  calculations: {
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

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
