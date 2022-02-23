import {Icon} from '@ui-kitten/components';
import React from 'react';

// Right arrow for lists
const PointRightArrow = (props) => (
  <Icon {...props} name="chevron-right-outline" />
);
// FilterIcon
const FilterIcon = (props) => <Icon {...props} name="funnel-outline" />;

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

export {PointRightArrow, FilterIcon, SearchIcon};
