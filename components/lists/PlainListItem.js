import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Layout, ListItem, Text} from '@ui-kitten/components';
import {PointRightArrow} from '../elements/Icons';
import {uploadsUrl} from '../../utils/url';
import moment from 'moment';

// SingleItem for vertical lists
const PlainListItem = ({navigation, singleItem, displayText, file}) => {
  file = singleItem.file_id;
  console.log(file);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <Layout
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
        }}
      >
        <Avatar
          shape="square"
          size={'giant'}
          source={{uri: uploadsUrl + singleItem.thumbnails.w160}}
        />
        <Layout style={styles.ListItemDetails}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 5,
              fontFamily: 'Karla_700Bold',
            }}
          >
            {singleItem.title}
          </Text>
        </Layout>
        {displayText === true ? (
          <Text style={{flex: 2, fontSize: 10, fontFamily: 'Karla_400Regular'}}>
            {moment(singleItem.time_added).format('DD.MM.YYYY hh:mm a')}
          </Text>
        ) : (
          <Text>{''}</Text>
        )}
        <ListItem style={{flex: 1}} accessoryRight={PointRightArrow} />
      </Layout>
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
  file: PropTypes.number,
};

export default PlainListItem;
