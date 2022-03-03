// Import from react
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

// Import from UI Kitten library
import {ListItem, Text} from '@ui-kitten/components';

// Import from files
import {PointRightArrow} from './elements/Icons';

// Return title for horizontal & vertical galleries on explore screen
const ExploreTitle = ({onPress, title}) => {
  return (
    <ListItem
      onPress={onPress}
      style={{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '90%',
        alignSelf: 'center',
        marginBottom: -10,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <ListItem
        style={{flex: 1, backgroundColor: 'transparent'}}
        accessoryRight={PointRightArrow}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 5,
    fontFamily: 'Karla_700Bold',
    fontSize: 22,
  },
});

ExploreTitle.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
};

export default ExploreTitle;
