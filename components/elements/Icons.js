import {Icon} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Right arrow for lists
const PointRightArrow = (props) => (
  <Icon {...props} name="chevron-right-outline" />
);

// CategoryIcon
const CategoryIcon = ({name, size = 22}) => {
  return (
    <View>
      <MaterialCommunityIcons name={name} size={size} />
    </View>
  );
};

export {PointRightArrow, CategoryIcon};
