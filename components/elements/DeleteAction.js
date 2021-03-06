import React, {useEffect} from 'react';
import {Alert, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {getToken} from '../../hooks/CommonFunction';
import {deleteMessage} from '../../hooks/MessageHook';
import PropTypes from 'prop-types';

const DeleteAction = ({message, user, setUpdateMessage, updateMessage}) => {
  const animation = React.createRef(); // animation

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleDelete = () => {
    Alert.alert('Delete Message', 'Confirm delete action?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await getToken();
            const response = await deleteMessage(message.comment_id, token);

            if (response) {
              setUpdateMessage(updateMessage + 1);
              Alert.alert('Message deleted');
              return;
            }
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDelete}>
      <View
        styles={{width: 30, justifyContent: 'center', alignItems: 'center'}}
      >
        {user.username === message.username ? (
          <LottieView
            ref={animation}
            style={styles.animation}
            source={require('../../assets/icons/trash-can-animation.json')}
            loop={true}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  animation: {
    height: 50,
    width: 50,
    top: 5,
    marginRight: 20,
    left: 7,
  },
});

DeleteAction.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object,
  setUpdateMessage: PropTypes.func,
  updateMessage: PropTypes.number,
};

export default DeleteAction;
