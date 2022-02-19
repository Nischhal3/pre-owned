import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  ButtonGroup,
  Icon,
  Layout,
  ListItem,
  Text,
} from '@ui-kitten/components';
import {PointRightArrow} from '../elements/Icons';
import {uploadsUrl} from '../../utils/url';
import moment from 'moment';
import colors from '../../utils/colors';

// SingleItem for vertical lists
const PlainListItem = ({navigation, singleItem, displayText, showMyMedia}) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('Product Detail', {file: singleItem});
      }}
    >
      <Layout style={styles.layout}>
        <Avatar
          shape="square"
          size={'giant'}
          style={{
            width: 70,
            height: 70,
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: colors.primary,
          }}
          source={{uri: uploadsUrl + singleItem.thumbnails.w160}}
        />
      </Layout>
      <Layout style={styles.titleBox}>
        <Text numberOfLines={1} style={styles.title}>
          {singleItem.title}
        </Text>
      </Layout>
      {displayText === true ? (
        <Text style={styles.displayTime}>
          {moment(singleItem.time_added).format('DD.MM.YYYY hh:mm a')}
        </Text>
      ) : (
        <Text>{''}</Text>
      )}
      {!showMyMedia ? (
        <ListItem
          style={{flex: 1, backgroundColor: colors.primary}}
          accessoryRight={PointRightArrow}
        />
      ) : null}
      {showMyMedia && (
        <ButtonGroup style={styles.buttonGroup} appearance="ghost">
          <Button
            style={styles.btn}
            accessoryLeft={<Icon name="edit-outline" />}
            onPress={() => {
              navigation.navigate('Modify', {file: singleItem});
            }}
          />
          <Button
            style={styles.btn}
            accessoryLeft={<Icon name="trash-2-outline" />}
          />
        </ButtonGroup>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
  },

  buttonGroup: {
    flex: 3.5,
    right: -5,
    width: 100,
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  displayTime: {
    flex: 2,
    fontSize: 10,
    fontFamily: 'Karla_400Regular',
    alignSelf: 'center',
  },
  layout: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    flex: 6,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginStart: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Karla_700Bold',
    alignSelf: 'center',
    width: 170,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: colors.primary,
  },
});

PlainListItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  displayText: PropTypes.bool,
  showMyMedia: PropTypes.object,
};

export default PlainListItem;
