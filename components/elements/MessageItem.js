import React, {useState, useEffect} from 'react';
import {getToken} from '../../hooks/CommonFunction';
import ListDetail from '../lists/ListDetail';

const MessageItem = ({singleMessage}) => {
  const [sender, setSender] = useState({username: 'loading...'});

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

  // get message sender
  const fetchMessageSender = async () => {
    try {
      const token = await getToken();
      const userData = await getUserById(singleMessage.user_id, token);
      setSender(userData);
    } catch (e) {
      console.error('get sender error', e.message);
      setSender({username: '[no username]'});
    }
  };
  useEffect(() => {
    fetchMessageSender();
  }, []);

  return (
    <ListDetail
      title={sender.username}
      description={singleMessage.comment}
      // image={{uri: avatar}}
    />
  );
};

export default MessageItem;
