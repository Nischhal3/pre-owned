import React from 'react';
import {Alert, Image, StyleSheet} from 'react-native';
import {
  Button,
  Card,
  Divider,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';

// Import from files
import {btnBackground, text_dark, stroke, text_light} from '../utils/colors';
import ListItem from '../components/ListItem';

// Alert when sending message
const sendMessage = () => {
  Alert.alert('Success', 'Message Sent');
};
const ProductDetail = () => {
  return (
    <Layout>
      <Image
        style={styles.image}
        source={require('../assets/products/books.jpg')}
      />
      <Layout style={styles.detailsContainer}>
        <Text style={styles.title}>Books</Text>
        <Text style={styles.price}>35€</Text>
        <Divider />

        <ListItem
          style={styles.userContainer}
          image={require('../assets/products/profilepic.jpg')}
          title="Annie H."
          subTitle="5 Listings"
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
          <Divider />
        </Layout>

        {/* <Card style={styles.productDetail}></Card> */}
        <Input
          multiline={true}
          textStyle={{minHeight: 64}}
          placeholder="Add Message"
          style={styles.commentBox}
        ></Input>
        <Button style={styles.sendBtn} onPress={sendMessage}>
          Send
        </Button>
      </Layout>
    </Layout>
  );
};
const styles = StyleSheet.create({
  commentBox: {
    padding: 10,
    borderColor: stroke,
  },
  detailsContainer: {
    padding: 20,
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
    color: text_dark,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  productDetail: {
    marginVertical: 20,
    height: 150,
  },
  sendBtn: {
    width: 100,
    backgroundColor: btnBackground,
    borderColor: btnBackground,
    alignSelf: 'flex-end',
    right: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ProductDetail;
