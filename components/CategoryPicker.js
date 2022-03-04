import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
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
    <Layout level="1" style={styles.layout}>
      <Select
        style={styles.select}
        caption="Choose a category for your product"
        placeholder="Select category"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <SelectItem
          style={styles.item}
          title="Home & Living"
          accessoryLeft={<CategoryIcon name="floor-lamp" />}
        />
        <SelectItem
        style={styles.item}
          title="Electronics"
          accessoryLeft={<CategoryIcon name="camera" />}
        />
        <SelectItem
        style={styles.item}
          title="Clothing"
          accessoryLeft={<CategoryIcon name="shoe-heel" />}
        />
        <SelectItem
        style={styles.item}
          title="Sports"
          accessoryLeft={<CategoryIcon name="basketball" />}
        />
        <SelectItem
        style={styles.item}
          title="Gaming & Accessories"
          accessoryLeft={<CategoryIcon name="cards" />}
        />
        <SelectItem
          title="Others"
          style={styles.item}
          accessoryLeft={<CategoryIcon name="application" />}
        />
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: 10,
    backgroundColor: colors.primary,
  },
  select: {
    backgroundColor: colors.primary,
  },
  item: {
    backgroundColor: colors.text_light,
  }
});

export default CategoryPicker;
