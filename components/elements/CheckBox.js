import React, {useEffect, useState} from 'react';
import {Button, CheckBox, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

// Filter categories
const categoryNames = [
  {category: 'Home & Living'},
  {category: 'Electronics'},
  {category: 'Clothing '},
  {category: 'Sports'},
  {category: 'Gaming & Accessories'},
  {category: 'Others'},
];

const ModalCheckBox = ({setItemPosition, setIsChecked, isChecked}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(categoryNames.length).fill(false)
  );

  // Handle checkBox state on click
  const handleOnChange = (position) => {
    setIsChecked(isChecked + 1);
    setItemPosition(position);
    try {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? true : false
      );
      setCheckedState(updatedCheckedState);
    } catch (e) {
      console.log('Filter update failed', e);
    }
  };

  // console.log(checkedState);

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
