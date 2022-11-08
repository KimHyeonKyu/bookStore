import React, { useState } from "react";
import styled from "styled-components";
import InputText from "./InputText";

const StyledInputBoxWrap = styled.div`
  margin-top: 1rem;
  font-size: 1.7rem;
`;

const InputBox = ({ name, type, title, placeholder, value, onChange }) => {
  return (
    <StyledInputBoxWrap>
      <div className="form-group">
        <label>{title}</label>
        {type !== "address" && (
          <InputText
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="form-control"
            placeholder={placeholder}
          ></InputText>
        )}
      </div>
    </StyledInputBoxWrap>
  );
};

export default InputBox;
