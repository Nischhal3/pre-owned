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
import {getFilesByTag} from '../hooks/MediaHooks';
import {getUserById} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {ProfileSeparator} from '../components/elements/ItemSeparator';

const Profile = ({route}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState();
  const [hasAvatar, setHasAvatar] = useState(false);
  const userIdParam = route.params?.profileParam ?? user.user_id;
  const [userProfile, setUserProfile] = useState({});

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
    padding: 0,
  },
  avatar: {
    width: 150,
    height: 150,
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
  },
  statisticsWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  icons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
  },
  username: {
    marginTop: '60%',
    alignSelf: 'center',
    fontSize: 26,
    fontFamily: 'Karla_400Regular',
  },
  description: {
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 3,
    fontFamily: 'Karla_400Regular',
  },
  activity: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Karla_700Bold',
    marginTop: '5%',
  },
  bio: {
    marginTop: 18,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Karla_700Bold',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
