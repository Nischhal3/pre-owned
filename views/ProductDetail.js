// Import from react
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Import from Library UI Kitten
import {Divider, Layout, Text} from '@ui-kitten/components';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Import from files
import colors from '../utils/colors';
import GlobalStyles from '../utils/GlobalStyles';
import {useFavourite} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/url';
import {getUserById} from '../hooks/ApiHooks';
import {ListDetail, MessageList} from '../components/lists';

const ProductDetail = ({route, navigation, profile, fileId}) => {
  const {file} = route.params;
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  // fetch Avatar
  // const fetchAvatar = async () => {
  //   try {
  //     const avatarList = await getFilesByTag('avatar_' + file.user_id);
  //     if (avatarList.length === 0) {
  //       return;
  //     }
  //     const avatar = avatarList.pop();
  //     setAvatar(uploadsUrl + avatar.filename);
  //     console.log('single.js avatar', avatar);
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchAvatar();
  // }, []);

  // favorite
  const {postFavourite, getFavourtiesByFileId, deleteFavourite} =
    useFavourite();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);
  const [name, setName] = useState('');

  // add to favourite
  const fetchLikes = async () => {
    try {
      const likesData = await getFavourtiesByFileId(file.file_id);
      const userData = await getUserById(file.user_id);

      setName(userData.username);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (e) {
      Alert.alert('Error showing likes', 'Close');
      console.error('fetch like error', e);
    }
  };
  const addLike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (e) {
      console.error('Add Like error', e);
    }
  };
  const unlike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (e) {
      console.error('Remove Like error', e);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [userLike]);
  const onSubmit = async () => {
    userLike ? await unlike() : addLike();
  };

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Image style={styles.image} source={{uri: uploadsUrl + file.filename}} />
      <ScrollView style={styles.detailsContainer}>
        <Layout style={styles.container}>
          <Layout style={styles.textbox}>
            <Text style={styles.title}>{file.title}</Text>
            {/* <Text style={styles.price}>35€</Text> */}
          </Layout>

          <Pressable onPress={onSubmit}>
            <MaterialCommunityIcons
              name={userLike ? 'heart' : 'heart-outline'}
              size={32}
              style={{right: 10}}
              color={userLike ? 'red' : 'black'}
            />

            <Text category="s1">{likes.length}</Text>
          </Pressable>
        </Layout>

        <Divider />

        <ListDetail
          onPress={() => {
            navigation.navigate('Profile', {file: profile});
          }}
          style={styles.userContainer}
          image={{uri: avatar}}
          title={name}
          description="5 Listings"
        />
        <Divider />
        <Layout style={styles.detailsContainer}>
          <Text category="s1" style={styles.detail}>
            Price & Details
          </Text>
          <Text
            style={styles.detailDescription}
            category="c1"
            numberOfLines={4}
          >
            {file.description}
          </Text>
        </Layout>
        <Text category="s1" style={styles.detailsContainer}>
          Send the Seller a message
        </Text>

        <MessageList fileId={file.file_id} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    padding: 15,
    backgroundColor: colors.container,
  },

  detail: {
    fontFamily: 'Karla_700Bold',
    fontSize: 16,
  },
  detailsContainer: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Karla_700Bold',
  },
  detailDescription: {
    paddingVertical: 15,
    lineHeight: 16,
    fontSize: 14,
    fontFamily: 'Karla',
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.text_dark,
    fontWeight: 'bold',
    fontSize: 20,
    bottom: 5,
    top: 5,
    fontFamily: 'Karla_400Regular',
    left: 10,
  },
  productDetail: {
    marginVertical: 20,
    height: 150,
  },

  textbox: {
    flexDirection: 'column',
    flex: 7,
    flexWrap: 'wrap',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.container,
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 20,
    flex: 2,
    flexWrap: 'wrap',
    fontWeight: '500',
    alignSelf: 'center',
    top: 15,
  },
  userContainer: {
    marginVertical: 40,
  },
});

ProductDetail.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  profile: PropTypes.object,
};
export default ProductDetail;
