import React from 'react';
import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Divider, Input, Layout, Text} from '@ui-kitten/components';
import PropTypes from 'prop-types';

// Import from files
import colors from '../utils/colors';
import {ProductList} from '../components/ListItem';
import {AppButton} from '../components/elements/AppButton';
import GlobalStyles from '../utils/GlobalStyles';

// Alert when sending message
const sendMessage = () => {
  Alert.alert('Success', 'Message Sent');
};
const ProductDetail = ({route}) => {
  const {file} = route.params;
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Image
        style={styles.image}
        source={require('../assets/products/books.jpg')}
      />
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.title}>Books</Text>
        <Text style={styles.price}>35€</Text>
        <Divider />

        <ProductList
          style={styles.userContainer}
          image={require('../assets/products/profilepic.jpg')}
          title="Annie H."
          subTitle="5 Listings"
          onPress={() => Keyboard.dismiss()}
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
