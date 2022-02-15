import {Icon} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import colors from '../../utils/colors';
// Right arrow for lists
const PointRightArrow = (props) => (
  <Icon {...props} name="chevron-right-outline" />
);
const AppIcon = ({
  name,
  size = 40,
  backgroundColor = '#fff',
  iconColor = colors.danger,
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
      <Icon name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
};

export {PointRightArrow, AppIcon};
