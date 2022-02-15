// Import from react
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Import from Library UI Kitten
import {Avatar, Divider, Input, Layout, Text} from '@ui-kitten/components';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Import from files
import colors from '../utils/colors';
import {ListDetail} from '../components/ListItem';
import {AppButton} from '../components/elements/AppButton';
import GlobalStyles from '../utils/GlobalStyles';
import {useFavourite, useTag} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/url';
import {getUserById, getUserByToken} from '../hooks/ApiHooks';
import {getToken} from '../hooks/CommonFunction';

// Alert when sending message
const sendMessage = () => {
  Alert.alert('Success', 'Message Sent');
};
const ProductDetail = ({route, navigation, profile}) => {
  const {file} = route.params;

  // fetch file

  //favorite
  const {postFavourite, getFavourtiesByFileId, deleteFavourite} =
    useFavourite();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);
  const [name, setName] = useState('');
  // Get user's detail
  const getUser = async () => {
    const token = await getToken();
    const users = await getUserByToken(token);
    setName(users.username);
  };
  // add to favourite
  const fetchLikes = async () => {
    try {
      const likesData = await getFavourtiesByFileId(file.file_id);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (e) {
      Alert.alert('Error showing likes', 'Close');
      console.error('fetch like error', e);
    }
  };
  const addLike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (e) {
      console.error('Add Like error', e);
    }
  };
  const unlike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (e) {
      console.error('Remove Like error', e);
    }
  };

  useEffect(() => {
    getUser();
    fetchLikes();
  }, [userLike]);

  const onSubmit = async () => {
    userLike ? await unlike() : addLike();
  };

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Image style={styles.image} source={{uri: uploadsUrl + file.filename}} />
      <ScrollView style={styles.detailsContainer}>
        <Layout style={styles.container}>
          <Layout
            style={{
              flexDirection: 'column',
              flex: 2,
              backgroundColor: colors.container,
            }}
          >
            <Text style={styles.title}>{file.title}</Text>
            <Text style={styles.price}>35€</Text>
          </Layout>

          <Pressable onPress={onSubmit}>
            <MaterialCommunityIcons
              name={userLike ? 'heart' : 'heart-outline'}
              size={32}
              style={{right: 10}}
              color={userLike ? 'red' : 'black'}
            />
            {/*            
                <Icon
                  name={userLike ? 'heart' : 'heart-outline'}
                  size={32}
                  color={userLike ? 'red' : 'black'}
                /> */}

            <Text category="s1">{likes.length}</Text>
          </Pressable>
        </Layout>

        <Divider />

        <ListDetail
          onPress={() => {
            navigation.navigate('Profile', {file: profile});
          }}
          style={styles.userContainer}
          image={require('../assets/products/profilepic.jpg')}
          title={name}
          description="5 Listings"
        >
          {/* // when api is ready */}
          {/* <Avatar source={{uri: avatar}} />
           */}
        </ListDetail>
        <Divider />
        <Layout style={styles.detailsContainer}>
          <Text category="s1" style={styles.detail}>
            Details
          </Text>
          <Text
            style={styles.detailDescription}
            category="c1"
            numberOfLines={4}
          >
            {file.description}
          </Text>
        </Layout>
        <Text category="s1" style={styles.detailsContainer}>
          Send the Seller a message
        </Text>
        <Input
          multiline={true}
          textStyle={{minHeight: 64}}
          placeholder="Add Message"
          style={styles.commentBox}
        ></Input>

        <AppButton style={styles.sendBtn} title="Send" onPress={sendMessage} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    padding: 15,
    backgroundColor: colors.container,
  },
  commentBox: {
    padding: 10,
    borderColor: colors.stroke,
  },

  detailsContainer: {
    padding: 10,
  },
  detailDescription: {
    paddingVertical: 15,
    lineHeight: 16,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.text_dark,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
    left: 10,
  },
  productDetail: {
    marginVertical: 20,
    height: 150,
  },
  sendBtn: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    left: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});

ProductDetail.propTypes = {
  route: PropTypes.object,
};
export default ProductDetail;
