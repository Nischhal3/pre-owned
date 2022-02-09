import {StyleSheet, Platform, StatusBar} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
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
    margin: 10,
    borderRadius: 19,
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },
});
