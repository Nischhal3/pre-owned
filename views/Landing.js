import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import List from '../components/ProductList';



const LandingScreen = () => {
  return (
    <SafeAreaView>

      <View style={styles.productContainer}>
      <Text style={styles.title}>Recently added</Text>
    <List />
    <Text style={styles.title}>Popular now</Text>
    <List />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  productContainer: {
    marginTop: 70,
      marginLeft: 15,
  },

  title: {
      marginTop: 40,
      marginBottom: 30,
      fontSize: 24,
      fontWeight: "500",
  },
});


export default LandingScreen;
