import {Button} from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';

const ButtonSmall = ({ title, onPress, color = colors.btnBackground }) => {
  return (
    <TouchableOpacity>
    <Button style={styles.btnStyleSmall} onPress={onPress} >
      {title}
    </Button>
    </TouchableOpacity>
  );
};

const ButtonMedium = ({ title, onPress, color = colors.btnBackground }) => {
  return (
    <TouchableOpacity>
    <Button style={styles.btnStyleMedium} onPress={onPress} >
      {title}
    </Button>
    </TouchableOpacity>
  );
};

const ButtonLarge = ({ title, onPress, color = colors.btnBackground }) => {
  return (
    <TouchableOpacity>
    <Button style={styles.btnStyleLarge} onPress={onPress} >
      {title}
    </Button>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  btnStyleSmall: {
    width: '50%',
    height: 50,
    bottom: 50,
    margin: 10,
    borderRadius: 19,
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },

  btnStyleMedium: {
    width: '70%',
    height: 60,
    bottom: 50,
    margin: 10,
    borderRadius: 19,
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },

  btnStyleLarge: {
    width: 300,
    height: 60,
    bottom: 50,
    margin: 10,
    borderRadius: 19,
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },
});


export {ButtonSmall, ButtonMedium, ButtonLarge};
