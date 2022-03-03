// Import from React and library
import React, {useContext} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten Library
import {
  Avatar,
  Button,
  ButtonGroup,
  Icon,
  Layout,
  ListItem,
  Text,
} from '@ui-kitten/components';

// Import from files

import moment from 'moment';
import {Shadow} from 'react-native-shadow-2';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils';
import {uploadsUrl} from '../../utils/url';
import {PointRightArrow} from '../elements/Icons';
import LikeComponent from '../LikeComponent';
// SingleItem for vertical lists
const FavouriteList = ({navigation, singleItem, displayText, showMyMedia}) => {
  const {update, setUpdate} = useContext(MainContext);

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <Layout style={styles.layout}>
        <Avatar
          shape="square"
          size={'giant'}
          style={styles.productImage}
          source={{uri: uploadsUrl + singleItem.thumbnails.w160}}
        />
      </Layout>
      <Layout style={styles.titleBox}>
        <Text numberOfLines={1} style={styles.title}>
          {singleItem.title}
        </Text>
      </Layout>

      <Text style={styles.displayTime}>
        {/* {moment(singleItem.username).format('DD.MM.YYYY hh:mm a')} */}
        Post by {singleItem.user_id}
      </Text>

      <LikeComponent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 3.5,
    width: 100,
    alignSelf: 'center',
  },
  displayTime: {
    flex: 2,
    fontSize: 12,
    fontFamily: 'Karla_400Regular',
    alignSelf: 'center',
    lineHeight: 20,
  },
  layout: {
    flex: 2,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: colors.box,
    left: 10,
  },
  titleBox: {
    flex: 6,
    backgroundColor: colors.box,
    alignSelf: 'center',
    marginStart: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Karla_700Bold',
    alignSelf: 'center',
    width: 170,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: colors.box,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
});

FavouriteList.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showMyMedia: PropTypes.bool,
  displayText: PropTypes.bool,
  file: PropTypes.number,
};

export default FavouriteList;
