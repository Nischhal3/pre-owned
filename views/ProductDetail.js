import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Divider, Icon, Input, Layout, Text} from '@ui-kitten/components';
import PropTypes from 'prop-types';

// Import from files
import colors from '../utils/colors';
import {ListDetail} from '../components/ListItem';
import {AppButton} from '../components/elements/AppButton';
import GlobalStyles from '../utils/GlobalStyles';
import LikeButton from '../components/elements/LikeButton';

// Alert when sending message
const sendMessage = () => {
  Alert.alert('Success', 'Message Sent');
};
const ProductDetail = ({route}) => {
  const {file} = route.params;
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Image
        style={styles.image}
        source={require('../assets/products/books.jpg')}
      />
      <ScrollView style={styles.detailsContainer}>
        <Layout style={styles.container}>
          <Layout style={{flexDirection: 'column', flex: 2}}>
            <Text style={styles.title}>Books</Text>
            <Text style={styles.price}>35€</Text>
          </Layout>
          {/* <ListDetail
            style={styles.userContainer}
            title="Books"
            description="25€"
          /> */}
          <LikeButton style={{flex: 1}} />
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
        {/* <Card style={styles.productDetail}></Card> */}
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
