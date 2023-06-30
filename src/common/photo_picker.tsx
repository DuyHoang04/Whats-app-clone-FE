import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";

type photoPickerType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const PhotoPicker: React.FC<photoPickerType> = ({ onChange }) => {
  const component = (
    <input type="file" hidden id="photo-picker" onChange={onChange} />
  );

  const targetElement = document.getElementById("photo-picker-element");

  return targetElement ? ReactDOM.createPortal(component, targetElement) : null;
};

export default PhotoPicker;
