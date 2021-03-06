// Import from react
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Platform, Pressable} from 'react-native';

// Import from Library UI Kitten
import {Text} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import {useFavourite} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import LottieView from 'lottie-react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {getToken} from '../hooks/CommonFunction';

const LikeComponent = ({file, heartAnimation = true}) => {
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {user, update, setUpdate} = useContext(MainContext);

  const {postFavourite, getFavourtiesByFileId, deleteFavourite} =
    useFavourite();

  // favorite animation
  let animation;
  let isFirstRun;

  if (heartAnimation) {
    animation = React.useRef(null);
    isFirstRun = React.useRef(true);
  }
  // add to favourite
  const fetchLikes = async () => {
    try {
      const likesData = await getFavourtiesByFileId(file.file_id);
      setLikes(likesData);

      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (e) {
      console.error('fetch like error', e);
    }
  };

  const addLike = async () => {
    setIsDisabled(true);
    try {
      const token = await getToken();
      const response = await postFavourite(file.file_id, token);

      if (response) {
        setIsDisabled(false);
        setUserLike(true);
        setUpdate(update + 1);
      }
    } catch (e) {
      console.error('Add Like error', e);
    }
  };
  const unlike = async () => {
    setIsDisabled(true);

    try {
      const token = await getToken();
      const response = await deleteFavourite(file.file_id, token);

      if (response) {
        if (heartAnimation) {
          setIsDisabled(false);
          setUserLike(false);
        }
        setUpdate(update + 1);
      }
    } catch (e) {
      console.error('Remove Like error', e);
    }
  };

  useEffect(() => {
    fetchLikes();
    if (heartAnimation) {
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
    }
  }, [userLike]);

  const onSubmit = async () => {
    userLike ? await unlike() : await addLike();
  };

  return (
    <Pressable
      onPress={onSubmit}
      style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
      disabled={isDisabled}
    >
      {heartAnimation ? (
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
          size={25}
          style={{right: 20, top: '-130%'}}
          color={userLike ? '#ed4b65' : colors.mediumGrey}
        />
      )}
    </Pressable>
  );
};
LikeComponent.propTypes = {
  file: PropTypes.object,
  heartAnimation: PropTypes.bool,
};
export default LikeComponent;
