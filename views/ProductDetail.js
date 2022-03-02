// Import from react
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import ReadMore from 'react-native-read-more-text';
import ImageViewer from 'react-native-image-zoom-viewer';

// Import from Library UI Kitten
import {Card, Divider, Icon, Layout, Text} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import {useFavourite} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/url';
import {getUserById} from '../hooks/ApiHooks';
import {MessageList} from '../components/lists';
import LottieView from 'lottie-react-native';
import {GlobalStyles} from '../utils';
import UserItem from '../components/elements/UserItem';
import {AppButton} from '../components/elements/AppButton';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const ProductDetail = ({route, navigation}) => {
  const {file} = route.params;
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const {postFavourite, getFavourtiesByFileId, deleteFavourite} =
    useFavourite();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {user, updateFavourite, setUpdateFavourite, update, setUpdate} =
    useContext(MainContext);
  const [name, setName] = useState('');
  // favorite animation
  const animation = React.useRef(null);
  const isFirstRun = React.useRef(true);

  // image zoom in view in modal
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: uploadsUrl + file.filename,
      width: '100%',
      height: undefined,
    },
  ];
  // // fetch Avatar
  // // const fetchAvatar = async () => {
  // //   try {
  // //     const avatarList = await getFilesByTag('avatar_' + file.user_id);
  // //     if (avatarList.length === 0) {
  // //       return;
  // //     }
  // //     const avatar = avatarList.pop();
  // //     setAvatar(uploadsUrl + avatar.filename);
  // //     console.log('single.js avatar', avatar);
  // //   } catch (e) {
  // //     console.error(e.message);
  // //   }
  // // };
  // // useEffect(() => {
  // //   fetchAvatar();
  // // }, []);

  // add to favourite
  const fetchLikes = async () => {
    try {
      const likesData = await getFavourtiesByFileId(file.file_id);
      const userData = await getUserById(file.user_id);

      setName(userData.username);
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
      if (response) {
        setUpdateFavourite(updateFavourite + 1);
        setUserLike(true);
        setUpdate(update + 1);
      }
    } catch (e) {
      console.error('Add Like error', e);
    }
  };
  const unlike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      if (response) {
        setUpdateFavourite(updateFavourite + 1);
        setUserLike(false);
        setUpdate(update + 1);
      }
    } catch (e) {
      console.error('Remove Like error', e);
    }
  };

  useEffect(() => {
    fetchLikes();
    if (isFirstRun.current) {
      if (userLike) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (userLike) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [userLike]);

  const onSubmit = async () => {
    userLike ? await unlike() : addLike();
  };

  return (
    <SafeAreaView style={[GlobalStyles.AndroidSafeArea, styles.safeView]}>
      <ScrollView>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            style={styles.image}
            source={{uri: uploadsUrl + file.filename}}
          />
        </TouchableOpacity>
        <Modal
          visible={visible}
          transparent={true}
          onBackdropPress={() => setVisible(false)}
        >
          <AppButton
            appBtnStyle={styles.closeBtn}
            onPress={() => setVisible(false)}
            accessoryLeft={<Icon name="close-outline" />}
          />
          <ImageViewer imageUrls={images} />
        </Modal>
        <View style={styles.boxShadow}>
          <Shadow distance={7}>
            <Card style={styles.card}>
              <Layout style={styles.container}>
                <Text style={styles.title}>{file.title}</Text>

                <Pressable
                  onPress={onSubmit}
                  style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
                >
                  <LottieView
                    ref={animation}
                    source={require('../assets/icons/like-animation.json')}
                    autoPlay={false}
                    loop={false}
                    style={{width: 60, height: 60, right: -5}}
                  />
                  <Text
                    category="s1"
                    style={{
                      right: Platform.OS === 'android' ? '25%' : '17%',
                      bottom: 10,
                      fontSize: 14,
                    }}
                  >
                    {likes.length}
                  </Text>
                </Pressable>
              </Layout>

              <Divider style={{backgroundColor: colors.lightGrey}} />

              <UserItem
                onPress={() => {
                  navigation.navigate('Profile', {profileParam: file.user_id});
                }}
                image={{uri: avatar}}
                title={name}
                description="5 Listings"
              />
              <Divider style={{backgroundColor: colors.lightGrey}} />

              <Text category="s1" style={styles.detail}>
                Price & Details
              </Text>
              <Layout style={styles.readMore}>
                <ReadMore numberOfLines={1}>
                  <Text
                    style={styles.detailDescription}
                    category="c1"
                    numberOfLines={4}
                  >
                    {file.description}
                  </Text>
                </ReadMore>
              </Layout>

              <Divider style={{backgroundColor: colors.lightGrey}} />
              <Text category="s1" style={styles.detail}>
                Send the Seller a message
              </Text>

              <MessageList fileId={file.file_id} />
            </Card>
          </Shadow>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  boxShadow: {
    marginVertical: 15,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 45,
    alignSelf: 'center',
    width: 360,
    // width: Platform.OS === 'android' ? 350 : 370,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    padding: 15,
    backgroundColor: colors.primary,
  },
  closeBtn: {
    zIndex: 1,
    width: 40,
    height: 10,
    position: 'absolute',
    marginTop: 100,
    // right: 5,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  detail: {
    fontFamily: 'Karla_700Bold',
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 15,
  },
  detailsContainer: {
    fontSize: 16,
    fontFamily: 'Karla_700Bold',
  },
  detailDescription: {
    lineHeight: 16,
    fontSize: 14,
    fontFamily: 'Karla',
  },
  image: {
    width: '100%',
    height: 280,
    marginBottom: 10,
  },
  price: {
    color: colors.text_dark,
    fontWeight: 'bold',
    fontSize: 20,
    bottom: 5,
    top: 5,
    fontFamily: 'Karla_400Regular',
    left: 10,
  },
  productDetail: {
    marginVertical: 20,
    height: 150,
  },

  readMore: {
    width: '90%',
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 15,
    backgroundColor: 'transparent',
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  textbox: {
    flexDirection: 'column',
    flex: 7,
    flexWrap: 'wrap',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 20,
    flex: 2,
    flexWrap: 'wrap',
    fontWeight: '500',
    alignSelf: 'center',
  },
});

ProductDetail.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  profile: PropTypes.object,
};
export default ProductDetail;
