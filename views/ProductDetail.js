// Import from react
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import ReadMore from 'react-native-read-more-text';
import ImageViewer from 'react-native-image-zoom-viewer';

// Import from Library UI Kitten
import {Card, Divider, Icon, Layout, Text} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import {getAvatar, useMedia} from '../hooks/MediaHooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/url';
import {getUserById} from '../hooks/ApiHooks';
import {MessageList} from '../components/lists';
import UserItem from '../components/elements/UserItem';
import {AppButton} from '../components/elements/AppButton';
import assetAvatar from '../assets/backgrounds/Avatar.png';
import LikeComponent from '../components/LikeComponent';

const ProductDetail = ({route, navigation}) => {
  const {file} = route.params;
  const uploadDefaultUri = Image.resolveAssetSource(assetAvatar).uri;
  const [avatar, setAvatar] = useState(uploadDefaultUri);
  const {updateAvatar} = useContext(MainContext);
  const [name, setName] = useState('');
  const {mediaArray} = useMedia();

  // image zoom in view in modal
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: uploadsUrl + file.filename,
      width: '100%',
      height: undefined,
    },
  ];

  const getUser = async () => {
    try {
      const userData = await getUserById(file.user_id);

      setName(userData.username);
    } catch (e) {
      Alert.alert('Error showing likes', 'Close');
      console.error('fetch like error', e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const userMedia = mediaArray.filter((item) => item.user_id === file.user_id);

  // Fetching avatar
  const fetchAvatar = async () => {
    await getAvatar(file.user_id, setAvatar);
  };

  useEffect(() => {
    fetchAvatar();
  }, [updateAvatar]);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.safeView}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{flex: 1}}
        >
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

                  <LikeComponent file={file} heartAnimation={true} />
                </Layout>
                <Divider style={{backgroundColor: colors.lightGrey}} />

                <UserItem
                  onPress={() => {
                    navigation.navigate('Profile', {
                      profileParam: file.user_id,
                    });
                  }}
                  image={{uri: avatar}}
                  title={name}
                  description={`${userMedia.length} Listings`}
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
                <ScrollView>
                  <MessageList fileId={file.file_id} />
                </ScrollView>
              </Card>
            </Shadow>
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ScrollView>
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
    borderRadius: 30,
    alignSelf: 'center',
    width: 350,
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
    alignSelf: 'center',
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
