import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, ActivityIndicator} from 'react-native';
import {Card, Layout, Button, Text, Avatar} from '@ui-kitten/components';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import {uploadsUrl} from '../utils/url';
import {getFilesByTag} from '../hooks/MediaHooks';
import {getUserById} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

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
        source={require('../assets/backgrounds/ProfileBG.png')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Layout style={styles.cardWrap}>
        {hasAvatar ? (
          <Avatar style={styles.avatar} source={{uri: avatar}} shape="round" />
        ) : (
          <Avatar
            style={styles.avatar}
            source={require('../assets/backgrounds/Avatar.png')}
            shape="round"
          />
        )}
        <Card style={styles.card}>
          <Text style={styles.username}>{userProfile.username}</Text>
          <Text style={styles.email}>{userProfile.email}</Text>
          {userProfile.full_name ? (
            <Text style={styles.description}>{userProfile.full_name}</Text>
          ) : (
            <Text style={styles.description}>User description not set.</Text>
          )}
          {/* <Button style={styles.logout} onPress={logout}>
            Logout
          </Button> */}
        </Card>
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
    zIndex: 0,
    position: 'absolute',
    top: 0,
  },
  cardWrap: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  avatar: {
    zIndex: 2,
    width: 150,
    height: 150,
    position: 'absolute',
    alignSelf: 'center',
    top: 120,
  },
  card: {
    zIndex: 1,
    top: '30%',
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    borderColor: colors.primary,
    position: 'relative',
  },
  username: {
    marginTop: 80,
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  email: {
    alignSelf: 'center',
    fontSize: 16,
  },
  description: {
    marginTop: 20,
    alignSelf: 'center',
  },
  logout: {
    marginTop: 100,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
