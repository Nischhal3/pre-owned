import {Icon} from '@ui-kitten/components';
import React from 'react';
import colors from '../../utils/colors';

// Right arrow for lists
const PointRightArrow = (props) => (
  <Icon {...props} name="chevron-right-outline" />
);
const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;

export {PointRightArrow, TrashIcon};
