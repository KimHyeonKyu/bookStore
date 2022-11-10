import axios from "axios";
import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";

const CheckBoxWrap = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const CheckBox = ({ type, basketPart, setBasketList, checkLogin }) => {
  const [checkState, setCheckState] = useState("isFull");  

  const changeCheckBox = async (e) => {
    setCheckState("isFull");

    if(type === "basketList"){
      await axios.put(
        `/api/basket/updateCheck?_id=${basketPart._id}&checkState=isFull&quantity=${basketPart.quantity}`
      );
      let response = await axios.get(`/api/basket/output?id=${checkLogin}`);
      setBasketList(response.data);
    }
  };

  const changeBlankBox = async (e) => {
    setCheckState("blank");

    if(type === "basketList"){
      await axios.put(
        `/api/basket/updateCheck?_id=${basketPart._id}&checkState=blank&quantity=0`
      );
      let response = await axios.get(`/api/basket/output?id=${checkLogin}`);
      setBasketList(response.data);
    }    
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
