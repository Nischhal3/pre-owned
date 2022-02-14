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
import {Divider, Input, Layout, Text} from '@ui-kitten/components';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Import from files
import colors from '../utils/colors';
import {ListDetail} from '../components/ListItem';
import {AppButton} from '../components/elements/AppButton';
import GlobalStyles from '../utils/GlobalStyles';
import {useFavourite} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';

// Alert when sending message
const sendMessage = () => {
  Alert.alert('Success', 'Message Sent');
};
const ProductDetail = ({route}) => {
  const {file} = route.params;

  //favorite
  const {postFavourite, getFavourtiesByFileId, deleteFavourite} =
    useFavourite();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);

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
    fetchLikes();
  }, [userLike]);

  const onSubmit = async () => {
    userLike ? await unlike() : addLike();
  };

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Image
        style={styles.image}
        source={require('../assets/products/books.jpg')}
      />
      <ScrollView style={styles.detailsContainer}>
        <Layout style={styles.container}>
          <Layout
            style={{
              flexDirection: 'column',
              flex: 2,
              backgroundColor: colors.container,
            }}
          >
            <Text style={styles.title}>Books</Text>
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

            <Text category="s1" >
              {likes.length}
            </Text>
          </Pressable>
        </Layout>

        <Divider />

        <ListDetail
          style={styles.userContainer}
          image={require('../assets/products/profilepic.jpg')}
          title="Annie H."
          description="5 Listings"
        />
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
            This is the product description This is the product descriptionThis
            is the product descriptionThis is the product descriptionThis is the
            product descriptionThis is the product descriptionThis is the
            product descriptionThis is the product descriptionThis is the
            product descriptionThis is the product descriptionThis is the
            product
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
