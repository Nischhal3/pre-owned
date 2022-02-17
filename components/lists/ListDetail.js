// Import from React
import React from 'react';
import {StyleSheet, TouchableHighlight, Platform} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten Library
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Import from files
import {PointRightArrow} from '../elements/Icons';
import colors from '../../utils/colors';

// now in use: ProductDetail.js, Messages
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
            <Text style={styles.title}>{title}</Text>
            {description && (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.description}
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
  description: {
    width: 250,
    color: colors.mediumGrey,
    paddingVertical: 5,
    fontFamily: 'Karla_400Regular_Italic',
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {fontWeight: '500', fontFamily: 'Karla_700Bold'},
});

ListDetail.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.object,
  IconComponent: PropTypes.object,
  onPress: PropTypes.func,
  renderRightActions: PropTypes.object,
};

export default ListDetail;
