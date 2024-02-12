import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CustomDateTimePickerModal = (props) => {
  console.log(props)
  return <DateTimePickerModal {...props} />;
};

export default CustomDateTimePickerModal;
