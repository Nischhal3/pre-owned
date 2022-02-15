import {StyleSheet, Platform, StatusBar} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  btnStyle: {
    width: 300,
    height: 60,
    margin: 10,
    borderRadius: 19,
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },

  formButtonStyle: {
    width: '50%',
    height: 50,
    marginBottom: 5,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
    marginTop: Platform.OS === 'android' ? -20 : 0,
  },
});
