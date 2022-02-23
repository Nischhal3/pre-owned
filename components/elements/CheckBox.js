import React, {useState} from 'react';
import {CheckBox, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

// Filter categories
const categoryNames = [
  {category: 'Clothing & Accessories'},
  {category: 'Home & Living'},
  {category: 'Electronics'},
  {category: 'Sport & Leisure'},
  {category: 'Music'},
  {category: 'Gaming'},
];

const ModalCheckBox = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(categoryNames.length).fill(false)
  );

  console.log(checkedState);

  // Handle checkBox state on click
  const handleOnChange = (position) => {
    try {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
    } catch (e) {
      console.log('Filter update failed', e);
    }
  };

  return (
    <Layout style={{backgroundColor: colors.primary}}>
      {categoryNames.map(({category}, index) => {
        return (
          <CheckBox
            key={index}
            name={category}
            checked={checkedState[index]}
            style={styles.checkBoxItem}
            onChange={() => handleOnChange(index)}
          >
            {category}
          </CheckBox>
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  checkBoxItem: {
    marginVertical: 10,
  },
});

export default ModalCheckBox;
