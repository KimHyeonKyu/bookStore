import React from "react";
import styled from "styled-components";

const StyledInputTextWrap = styled.div`
  & + & {
    margin-top: 0.5rem;
  }
`;

const InputText = ({
  name,
  type,
  placeholder,
  inputValue,
  value,
  onChange,
  onMouseMove
}) => {
  return (
    <StyledInputTextWrap>
      {type === "address" && (
        <input
          name={name}
          type={type}
          className="form-control form-control-lg"
          placeholder={placeholder}
          defaultValue={inputValue}
          onChange={onChange}
          onBlur={onMouseMove}
        ></input>
      )}
      {type !== "address" && (
        <input
          name={name}
          type={type}
          className="form-control form-control-lg"
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
        ></input>
      )}
    </StyledInputTextWrap>
  );
};

export default InputText;
