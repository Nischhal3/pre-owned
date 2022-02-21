import React, {useState} from 'react';
import {Layout, Select, SelectItem, IndexPath} from '@ui-kitten/components';
import {CategoryIcon} from './elements/Icons';

const CategoryPicker = () => {
  // categories selection
  const categories = [
    'Select Category',
    'Home & Living',
    'Electronics',
    'Clothing',
    'Sports',
    'Gaming & Accessories',
    'Others',
  ];
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const displayValue = categories[selectedIndex.row];

  return (
    <Layout level="1">
      <Select
        // label="Category"
        caption="Choose a category for your product"
        captionTextStyle={{margin: 10}}
        placeholder="Select category"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <SelectItem title="" />
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
