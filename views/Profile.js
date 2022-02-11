import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
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
import {fetchMedia, useMedia} from '../hooks/MediaHooks';

const Profile = () => {
  const {mediaArray} = useMedia();
  const {setIsLoggedIn} = useContext(MainContext);

  const logout = async () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
  };
  console.log('Profile', {mediaArray});

  return (
    <Layout style={styles.container}>
      <Image
        style={styles.backgroundImg}
        source={require('../assets/backgrounds/ProfileBG.png')}
      />
      <Layout style={styles.cardWrap}>
        <Avatar
          style={styles.avatar}
          source={require('../assets/backgrounds/LoginBG.png')}
          shape="round"
        />
        <Card style={styles.card}>
          <Text style={styles.username}>Username</Text>
          <Divider />
          <Text style={styles.description}>
            I am able to provide fast delivery. If you live nearby. I can even
            make a drop of.
          </Text>
          <Button style={styles.logout} onPress={logout}>
            Logout
          </Button>
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
