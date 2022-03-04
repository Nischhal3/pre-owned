// Import from React and library
import React, {useContext, useEffect, useState} from 'react';
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
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils';
import {uploadsUrl} from '../../utils/url';
import {LikeComponent} from '../index';
import {getUserById} from '../../hooks/ApiHooks';

// SingleItem for vertical lists
const FavouriteList = ({navigation, singleItem}) => {
  const {update, setUpdate} = useContext(MainContext);
  const [itemUser, setItemUser] = useState({});

  const getUser = async () => {
    const user = await getUserById(singleItem.user_id);
    setItemUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

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
      {/* <Layout style={styles.titleBox}> */}
      <Text numberOfLines={1} style={styles.title}>
        {singleItem.title}
      </Text>
      {/* </Layout> */}

      <Text style={styles.username}>Post by {itemUser.username}</Text>
      <LikeComponent file={singleItem} heartAnimation={false} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 3.5,
    width: 100,
    alignSelf: 'center',
  },
  username: {
    flex: 3,
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
  // titleBox: {
  //   flex: 6,
  //   backgroundColor: 'transparent',
  //   alignSelf: 'center',
  // },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Karla_700Bold',
    alignSelf: 'center',
    width: 170,
    marginStart: 25,
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
