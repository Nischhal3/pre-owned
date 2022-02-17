import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, ListItem, Text} from '@ui-kitten/components';
import {PointRightArrow} from '../elements/Icons';
import {uploadsUrl} from '../../utils/url';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

// SingleItem for vertical lists
const PlainListItem = ({navigation, singleItem, displayText}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <ListItem style={{flex: 1, flexDirection: 'row'}}>
        <Avatar
          shape="square"
          size={'giant'}
          source={{uri: uploadsUrl + singleItem.thumbnails.w160}}
        />
        <ListItem style={styles.ListItemDetails}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 5,
              fontFamily: 'Karla_400Regular',
            }}
          >
            {singleItem.title}
          </Text>
        </ListItem>
        {displayText === true ? (
          <Text style={{flex: 2, fontSize: 10, fontFamily: 'Karla_400Regular'}}>
            {moment(singleItem.time_added).format('DD.MM.YYYY hh:mm a')}
          </Text>
        ) : (
          <Text>{''}</Text>
        )}
        <ListItem style={{flex: 1}} accessoryRight={PointRightArrow} />
      </ListItem>
    </TouchableOpacity>
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
  displayText: PropTypes.bool,
};

export default PlainListItem;
