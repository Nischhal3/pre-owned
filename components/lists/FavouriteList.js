// Import from React and library
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten Library
import {Avatar, Layout, Text} from '@ui-kitten/components';

// Import from files
import {colors} from '../../utils';
import {uploadsUrl} from '../../utils/url';
import {LikeComponent} from '../index';
import {getUserById} from '../../hooks/ApiHooks';

// Import screen orientation
import screenOrientation from '../../components/screenOrientation';

// SingleItem for vertical lists
const FavouriteList = ({navigation, singleItem}) => {
  const [itemUser, setItemUser] = useState({});

  // Screen orientation
  const [orientation, setOrientation] = useState(
    screenOrientation.isPortrait() ? 'portrait' : 'landscape'
  );

  const getUser = async () => {
    const user = await getUserById(singleItem.user_id);
    setItemUser(user);
  };

  useEffect(() => {
    getUser();
    Dimensions.addEventListener('change', () => {
      setOrientation(screenOrientation.isPortrait() ? 'portrait' : 'landscape');
    });
  }, []);

  if (orientation === 'portrait') {
    return (
      <View
        style={{
          flexd: 'row',
          backgroundColor: colors.box,
          borderRadius: 7,
          borderWidth: 1,
          borderColor: colors.lightGrey,
          marginHorizontal: 10,
        }}
      >
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
          <Text numberOfLines={1} style={styles.title}>
            {singleItem.title}
          </Text>

          <Layout style={styles.user}>
            <Text style={styles.postTitle}>Post by</Text>
            <Text style={styles.username}>{itemUser.username}</Text>
          </Layout>
        </TouchableOpacity>
        <LikeComponent file={singleItem} heartAnimation={false} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexd: 'row',
          backgroundColor: colors.box,
          borderRadius: 7,
          borderWidth: 1,
          borderColor: colors.lightGrey,
          marginHorizontal: 10,
        }}
      >
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
          <Text numberOfLines={1} style={styles.title}>
            {singleItem.title}
          </Text>

          <Layout style={styles.userLandscape}>
            <Text style={styles.postTitleLandscape}>Post by</Text>
            <Text style={styles.usernameLandscape}>{itemUser.username}</Text>
          </Layout>
        </TouchableOpacity>
        <LikeComponent file={singleItem} heartAnimation={false} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postTitle: {
    fontSize: 14,
    top: '25%',
    fontFamily: 'Karla_400Regular',
    left: Platform.OS === 'android' ? '-38%' : 0,
    alignSelf: 'flex-end',
    color: colors.mediumGrey,
  },
  username: {
    flex: 3,
    fontSize: 12,
    fontFamily: 'Karla_400Regular',
    alignSelf: 'center',
    right: Platform.OS === 'android' ? '5%' : '-30%',
    top: '30%',
    color: colors.mediumGrey,
    fontWeight: 'bold',
  },
  productImage: {
    width: 70,
    height: 70,
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: colors.box,
    left: 10,
  },
  user: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    right: '30%',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Karla_700Bold',
    alignSelf: 'center',
    width: 150,
    marginStart: '10%',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: -10,
    top: 10,
    width: Platform.OS === 'ios' ? '85%' : '100%',
  },
  userLandscape: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    right: '30%',
  },
  postTitleLandscape: {
    fontSize: 16,
    top: '25%',
    fontFamily: 'Karla_400Regular',
    alignSelf: 'center',
    color: colors.mediumGrey,
  },
  usernameLandscape: {
    fontSize: 12,
    fontFamily: 'Karla_400Regular',
    alignSelf: 'center',
    top: '30%',
    color: colors.mediumGrey,
    fontWeight: 'bold',
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
