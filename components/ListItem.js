import React from 'react';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Layout, Text} from '@ui-kitten/components';

import {text_dark, text_light} from '../utils/colors';

const ListItem = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={text_light} onPress={onPress}>
        <Layout style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <Layout style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            {subTitle && <Text style={styles.price}>{subTitle}</Text>}
          </Layout>
        </Layout>
      </TouchableHighlight>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: text_light,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  price: {
    color: text_dark,
  },
  title: {
    fontWeight: '500',
  },
});

export default ListItem;
