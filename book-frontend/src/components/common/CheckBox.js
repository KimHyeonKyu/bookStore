import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const CheckBox = () => {
  const [checkState, setCheckState] = useState("blank");

  const changeCheckBox = () => {
    setCheckState("isFull");
  };

  const changeBlankBox = () => {
    setCheckState("blank");
  };
  return (
    <div>
      {checkState === "isFull" && (
        <MdCheckBox size="32" onClick={changeBlankBox} />
      )}
      {checkState === "blank" && (
        <MdCheckBoxOutlineBlank size="32" onClick={changeCheckBox} />
      )}
    </div>
  );
};

export default CheckBox;
