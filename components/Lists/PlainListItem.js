import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, ListItem, Text} from '@ui-kitten/components';
import {PointRightArrow} from '../elements/Icons';

// SingleItem for vertical lists
const PlainListItem = ({navigation, singleItem}) => {
  return (
    <ListItem style={{flex: 1, flexDirection: 'row'}}>
      <Avatar
        shape="square"
        size={'giant'}
        source={{uri: singleItem.thumbnails.w160}}
      />
      <ListItem style={styles.ListItemDetails}>
        <Text category={'h6'} style={{fontWeight: '500', marginBottom: 5}}>
          {singleItem.title}
        </Text>
        <Text category={'p1'}>{singleItem.price}</Text>
      </ListItem>
      <Text category={'p2'} style={{flex: 2}}>
        {singleItem.published}
      </Text>
      <ListItem style={{flex: 1}} accessoryRight={PointRightArrow} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  ListItemDetails: {
    flex: 6,
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginStart: 15,
  },
});

PlainListItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default PlainListItem;
