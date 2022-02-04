import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';



const products = [
  {
      'key': '0',
      'title': 'Pink t-shirt',
      'description': 'Very neat and great fabric',
      'thumbnails': {
          w160: 'http://placekitten.com/160/164',
      },
      'filename': 'http://placekitten.com/2048/1920',
  },
  {
      'key': '1',
      'title': 'Pink t-shirt',
      'description': 'Very neat and great fabric',
      'thumbnails': {
          w160: 'http://placekitten.com/160/164',
      },
      'filename': 'http://placekitten.com/2048/1920',
  },
  {
      'key': '2',
      'title': 'Pink t-shirt',
      'description': 'Very neat and great fabric',
      'thumbnails': {
          w160: 'http://placekitten.com/160/164',
      },
      'filename': 'http://placekitten.com/2048/1920',
  },
];



const image = {uri: "http://placekitten.com/2048/1920"};


const ItemGallery = () => {
  return (
    <ScrollView horizontal={true}>
      <TouchableOpacity>
      <Image source={image} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity>
      <Image source={image} style={styles.image} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gallery: {
    marginStart: 15,
    marginBottom: 30,
  },

  image: {
    width: 340,
    height: 225,
    borderRadius: 15,
    marginEnd: 10,
  },
});


export default ItemGallery;
