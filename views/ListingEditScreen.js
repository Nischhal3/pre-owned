import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import CategoryPickerItem from '../components/categorypicker/CategoryPickerItem';
import Selection from '../components/categorypicker/Selection';
import Screen from '../components/Screen';

const categories = [
  {
    file: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',

    label: 'Furniture',
    value: 1,
  },
  {
    file: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2659&q=80',

    label: 'Accessories',
    value: 2,
  },
  {
    file: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',

    icon: 'camera',
    label: 'Cameras',
    value: 3,
  },
  {
    file: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=947&q=80',
    icon: 'cards',
    label: 'Games',
    value: 4,
  },
  {
    file: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    icon: 'shoe-heel',
    label: 'Clothing',
    value: 5,
  },
  {
    file: 'https://images.unsplash.com/photo-1512412046876-f386342eddb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
    icon: 'basketball',
    label: 'Sports',
    value: 6,
  },
  {
    file: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    icon: 'headphones',
    label: 'Movies & Music',
    value: 7,
  },
  {
    file: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    icon: 'book-open-variant',
    label: 'Books',
    value: 8,
  },
  {
    file: 'https://images.unsplash.com/photo-1580567814278-64f290c71bf6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2716&q=80',
    icon: 'application',
    label: 'Other',
    value: 9,
  },
];

const ListingEditScreen = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <Screen style={styles.container}>
      <Selection
        items={categories}
        name="category"
        numberOfColumns={3}
        PickerItemComponent={CategoryPickerItem}
        placeholder="Category"
        width="50%"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
