// Import from react & libraries
import React from 'react';
import {View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import PropTypes from 'prop-types';

// Import from UI Kitten library
import {Icon} from '@ui-kitten/components';

// Right arrow for lists
const PointRightArrow = (props) => (
  <Icon {...props} name="chevron-right-outline" />
);

const CategoryIcon = ({name, size = 22}) => {
  return (
    <View>
      <MaterialCommunityIcons name={name} size={size} />
    </View>
  );
};

const FilterIcon = (props) => <Icon {...props} name="funnel-outline" />;

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

CategoryIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
};

export {PointRightArrow, CategoryIcon, FilterIcon, SearchIcon};
