// Import from React & libraries
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

// Import from UI Kitten
import {CheckBox, Layout} from '@ui-kitten/components';

// Import from files
import colors from '../../utils/colors';

const ModalCheckBox = ({
  categoryNames,
  setItemPosition,
  setIsChecked,
  isChecked,
}) => {
  // new array to store values if checkbox is checked
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

ModalCheckBox.propTypes = {
  setItemPosition: PropTypes.func,
  setIsChecked: PropTypes.func,
  isChecked: PropTypes.number,
};

const styles = StyleSheet.create({
  checkBoxItem: {
    marginVertical: 10,
  },
});

export default ModalCheckBox;
