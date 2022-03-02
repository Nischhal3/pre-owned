// Import from React and library
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten library
import {Layout, Text, Avatar} from '@ui-kitten/components';

// Import from files
import {MainContext} from '../contexts/MainContext';
import colors from '../utils/colors';
import {getAvatar} from '../hooks/MediaHooks';
import {getUserById} from '../hooks/ApiHooks';
import {ProfileSeparator} from '../components/elements/ItemSeparator';
import Statistics from '../components/elements/ProfileStatistics';
import assetAvatar from '../assets/backgrounds/Avatar.png';

const Profile = ({route}) => {
  const uploadDefaultUri = Image.resolveAssetSource(assetAvatar).uri;
  const {user, updateAvatar} = useContext(MainContext);
  const [avatar, setAvatar] = useState(uploadDefaultUri);
  const userIdParam = route.params?.profileParam ?? user.user_id;
  const [userProfile, setUserProfile] = useState({});

  // Fetching avatar
  const fetchAvatar = async () => {
    try {
      const info = await getUserById(userIdParam);
      setUserProfile(info);
      await getAvatar(userIdParam, setAvatar);
    } catch (error) {
      console.log('Profile avatar', error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [updateAvatar]);

  return (
    <Layout style={styles.container}>
      <Image
        style={styles.backgroundImg}
        source={require('../assets/backgrounds/profile_background.png')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Layout style={styles.profileWrapper}>
        <Avatar style={styles.avatar} source={{uri: avatar}} shape="round" />
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
      <Statistics />
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
});

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
