import React from 'react';
import {ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const ImageWithOverlay = ({source, style}) => {
  return (
    <ImageBackground
      source={source}
      style={style}
      imageStyle={ { borderRadius: 15 } }
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0.5,0.5)']}
        style={{flex: 1, justifyContent: 'center', borderRadius: 15}}
      ></LinearGradient>
    </ImageBackground>
  );
};

export default ImageWithOverlay;
