// Import from react
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import ReadMore from 'react-native-read-more-text';
import ImageViewer from 'react-native-image-zoom-viewer';

// Import from Library UI Kitten
import {Card, Divider, Icon, Layout, Text} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import {getAvatar, useFavourite, useMedia} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/url';
import {getUserById} from '../hooks/ApiHooks';
import {MessageList} from '../components/lists';
import LottieView from 'lottie-react-native';
import {GlobalStyles} from '../utils';
import UserItem from '../components/elements/UserItem';
import {AppButton} from '../components/elements/AppButton';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import assetAvatar from '../assets/backgrounds/Avatar.png';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const LikeComponent = ({file, favList}) => {
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {
    user,
    updateFavourite,
    setUpdateFavourite,
    updateAvatar,
    update,
    setUpdate,
  } = useContext(MainContext);

  const {postFavourite, getFavourtiesByFileId, deleteFavourite} =
    useFavourite();

  // favorite animation
  const animation = React.useRef(null);
  const isFirstRun = React.useRef(true);

  // add to favourite
  const fetchLikes = async () => {
    try {
      const likesData = await getFavourtiesByFileId(file.file_id);
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
      if (response) {
        setUpdateFavourite(updateFavourite + 1);
        setUserLike(true);
        setUpdate(update + 1);
      }
    } catch (e) {
      console.error('Add Like error', e);
    }
  };
  const unlike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      if (response) {
        setUpdateFavourite(updateFavourite + 1);
        setUserLike(false);
        setUpdate(update + 1);
      }
    } catch (e) {
      console.error('Remove Like error', e);
    }
  };

  useEffect(() => {
    fetchLikes();
    if (isFirstRun.current) {
      if (userLike) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (userLike) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [userLike]);

  const onSubmit = async () => {
    userLike ? await unlike() : addLike();
  };

  return (
    <Pressable
      onPress={onSubmit}
      style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
    >
      {!favList ? (
        <>
          <LottieView
            ref={animation}
            source={require('../assets/icons/like-animation.json')}
            autoPlay={false}
            loop={false}
            style={{width: 60, height: 60, right: -5}}
          />
          <Text
            category="s1"
            style={{
              right: Platform.OS === 'android' ? '25%' : '17%',
              bottom: 10,
              fontSize: 14,
            }}
          >
            {likes.length}
          </Text>
        </>
      ) : (
        <MaterialCommunityIcons
          name={userLike ? 'heart' : 'heart-outline'}
          size={32}
          style={{right: 10}}
          color={userLike ? 'red' : 'black'}
        />
      )}
    </Pressable>
  );
};

export default LikeComponent;
