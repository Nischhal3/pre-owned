import {StyleSheet, Platform, StatusBar} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  btnStyle: {
    width: 300,
    height: 50,
    margin: 20,
    borderRadius: 19,
    fontFamily: 'Karla_700Bold',
    alignSelf: 'center',
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },

  formButtonStyle: {
    width: '50%',
    height: 50,
    borderRadius: 20,
    alignSelf: 'center',
    fontFamily: 'Karla_700Bold',
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },
  input: {
    borderRadius: 10,

    backgroundColor: colors.text_light,
  },
});
