// Import from React
import React from 'react';
import {StyleSheet, TouchableHighlight, Platform} from 'react-native';

// Import from UI Kitten Library
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Import from files
import {PointRightArrow} from '../elements/Icons';
import colors from '../../utils/colors';

// now in use: ProductDetail.js
const ListDetail = ({
  title,
  description,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.text_light} onPress={onPress}>
        <Layout style={styles.container}>
          {IconComponent}
          {image && <Avatar style={styles.image} source={image} />}
          <Layout style={styles.detailsContainer}>
            <Text style={{fontWeight: '500'}}>{title}</Text>
            {description && (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{width: 250, color: colors.mediumGrey}}
              >
                {description}
              </Text>
            )}
          </Layout>
          <ListItem
            style={{flex: 1, right: Platform.OS === 'android' ? 40 : 20}}
            accessoryRight={PointRightArrow}
          />
        </Layout>
      </TouchableHighlight>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,

    backgroundColor: colors.text_light,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
});
export default ListDetail;
