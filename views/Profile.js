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

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState();
  const [hasAvatar, setHasAvatar] = useState(false);

  const logout = async () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
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
        <Avatar
          style={styles.avatar}
          source={{uri: avatar}}
          shape="round"
        />
      ) : (
        <Avatar
          style={styles.avatar}
          source={require('../assets/backgrounds/LoginBG.png')}
          shape="round"
        />
      )}
        <Card style={styles.card}>
          <Text style={styles.username}>{user.username}</Text>
          <Divider />
          {user.description ? (
            <Text style={styles.description}>
              {user.description}
            </Text>
          ) : (
            <Text style={styles.description}>
              User description not set.
            </Text>
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
    backgroundColor: colors.container,
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
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    position: 'relative',
  },
  username: {
    marginTop: 80,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    alignSelf: 'center',
  },
  logout: {
    marginTop: 100,
  },
});

export default Profile;
