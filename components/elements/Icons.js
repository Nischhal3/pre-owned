import {Icon} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import colors from '../../utils/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Right arrow for lists
const PointRightArrow = (props) => (
  <Icon {...props} name="chevron-right-outline" />
);

// AppIcon, used in category
const AppIcon = ({
  name,
  size = 40,
  backgroundColor = '#fff',
  iconColor = colors.text_light,
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />

      {/* <Icon name={name} color={iconColor} size={size * 0.5} /> */}
    </View>
  );
};

export {PointRightArrow, AppIcon};
