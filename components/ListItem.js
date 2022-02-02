import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';



const image = {uri: "http://placekitten.com/2048/1920"};

const ListItem = () => {
  return (
    <TouchableOpacity>
        <Image source={image} style={styles.imgContainer}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
      width: 320,
      height: 200,
      borderRadius: 12,
  },
});


export default ListItem;
