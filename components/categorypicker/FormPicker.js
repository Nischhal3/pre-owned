import React from 'react';
import {Formik, useFormikContext} from 'formik';

import Picker from './Picker';
// import ErrorMessage from './ErrorMessage';

function FormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) {
  const {errors, setFieldValue, touched, values} = useFormikContext() ?? {};

  return (
    <>
      <Formik
        initialValues={{category: null}}
        onSubmit={(values) => console.log(values)}
        // validationSchema={validationSchema}
      >
        <Picker
          items={items}
          numberOfColumns={numberOfColumns}
          onSelectItem={(item) => setFieldValue(name, item)}
          PickerItemComponent={PickerItemComponent}
          placeholder={placeholder}
          // selectedItem={values[name]}
          width={width}
        />
      </Formik>
      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </>
  );
}

export default FormPicker;
