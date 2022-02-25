import React, {useContext, useEffect} from 'react';
import {Alert, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import LottieView from 'lottie-react-native';
// import {useMessage} from '../../hooks/MediaHooks';
import {MainContext} from '../../contexts/MainContext';

const DeleteAction = () => {
  const animation = React.createRef(); // animation

  useEffect(() => {
    animation.current?.play();
  }, []);

  // delete function
  // const {deleteMessage} = useMessage();
  const {update, setUpdate} = useContext(MainContext);
  // const handleDelete = () => {
  //   console.log(item);

  //   Alert.alert('Delete Message', 'Confirm delete action?', [
  //     {text: 'Cancel'},
  //     {
  //       text: 'OK',
  //       onPress: async () => {
  //         try {
  //           const response = await deleteMessage(item.comment_id);
  //           console.log(response);
  //           // update the list after deletion
  //           response && setUpdate(update + 1);
  //         } catch (e) {
  //           console.error(e);
  //         }
  //       },
  //     },
  //   ]);
  // };

  return (
    // <TouchableWithoutFeedback onPress={onPress}>
    <TouchableWithoutFeedback>
      <LottieView
        ref={animation}
        style={styles.animation}
        source={require('../../assets/icons/trash-can-animation.json')}
        loop={true}
      />
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
