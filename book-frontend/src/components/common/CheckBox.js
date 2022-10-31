import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";

const CheckBoxWrap = styled.div`
  cursor: pointer;
  &:hover{
    opacity: 0.7;
  }
`;

const CheckBox = ({basketList, setCheckItem}) => {
  const [checkState, setCheckState] = useState("blank");

  const changeCheckBox = () => {
    setCheckState("isFull");
    setCheckItem(basketList._id);
  };

  const changeBlankBox = () => {
    setCheckState("blank");
    setCheckItem("");
  };

  
  return (
    <CheckBoxWrap>
      {checkState === "isFull" && (
        <MdCheckBox size="32" onClick={changeBlankBox} />
      )}
      {checkState === "blank" && (
        <MdCheckBoxOutlineBlank size="32" onClick={changeCheckBox} />
      )}
    </CheckBoxWrap>
  );
};

export default CheckBox;
