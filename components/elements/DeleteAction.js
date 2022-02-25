import React, {useEffect} from 'react';
import {Alert, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import LottieView from 'lottie-react-native';
import {getToken} from '../../hooks/CommonFunction';
import {deleteMessage} from '../../hooks/MessageHook';
import {colors} from '../../utils';
// import {useMessage} from '../../hooks/MediaHooks';

const DeleteAction = ({message, user}) => {
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
            // console.log(response);
            if (response) {
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
    <TouchableWithoutFeedback>
      {user.username === message.username ? (
        <LottieView
          ref={animation}
          style={styles.animation}
          source={require('../../assets/icons/trash-can-animation.json')}
          loop={true}
          onPress={handleDelete}
        />
      ) : null}
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  animation: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    left: 15,
  },
});
// DeleteAction.propTypes = {
//   item: PropTypes.object,
// };
export default DeleteAction;
