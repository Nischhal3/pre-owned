import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Icon} from '@ui-kitten/components';
import {colors} from '../../utils';
import LottieView from 'lottie-react-native';

const DeleteAction = ({onPress}) => {
  const animation = React.createRef(); // animation

  useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    // <Button
    //   onPress={onPress}
    //   style={styles.container}
    //   accessoryRight={
    // }></Button>
    <TouchableWithoutFeedback onPress={onPress}>
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
//   onPress: PropTypes.object,
// };
export default DeleteAction;
