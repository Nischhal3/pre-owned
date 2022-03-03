import React, {useCallback, useEffect, useState} from 'react';
import {Layout, Select, SelectItem, IndexPath} from '@ui-kitten/components';
import {CategoryIcon} from './elements/Icons';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../utils';

const CategoryPicker = ({setCategory}) => {
  // categories selection
  const categories = [
    'Home & Living',
    'Electronics',
    'Clothing',
    'Sports',
    'Gaming & Accessories',
    'Others',
  ];
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const displayValue = categories[selectedIndex.row];

  // Sets value of category after selectedIndex is rendered
  useEffect(() => {
    setCategory(displayValue);
  }, [displayValue]);

  useFocusEffect(
    useCallback(() => {
      return () => setSelectedIndex(new IndexPath(0));
    }, [])
  );

  return (
    <Layout level="1" style={{marginTop: 10, backgroundColor: colors.primary}}>
      <Select
        caption="Choose a category for your product"
        captionTextStyle={{margin: 10}}
        placeholder="Select category"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <SelectItem
          title="Home & Living"
          accessoryLeft={<CategoryIcon name="floor-lamp" />}
        />
        <SelectItem
          title="Electronics"
          accessoryLeft={<CategoryIcon name="camera" />}
        />
        <SelectItem
          title="Clothing"
          accessoryLeft={<CategoryIcon name="shoe-heel" />}
        />
        <SelectItem
          title="Sports"
          accessoryLeft={<CategoryIcon name="basketball" />}
        />
        <SelectItem
          title="Gaming & Accessories"
          accessoryLeft={<CategoryIcon name="cards" />}
        />
        <SelectItem
          title="Others"
          accessoryLeft={<CategoryIcon name="application" />}
        />
      </Select>
    </Layout>
  );
};

export default CategoryPicker;
