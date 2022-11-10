import React from "react";
import styled from "styled-components";
import InputText from "./InputText";

const StyledInputBoxWrap = styled.div`
  margin-top: 1rem;
  font-size: 1.7rem;
`;

const InputBox = ({ ref, name, type, title, placeholder, value, onChange, readOnly 
  }) => {
  return (
    <StyledInputBoxWrap>
      <div className="form-group">
        <label>{title}</label>
        {type !== "address" && (
          <InputText
            ref={ref}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="form-control"
            placeholder={placeholder}
            readOnly={readOnly}
          ></InputText>
        )}
      </div>
    </StyledInputBoxWrap>
  );
};

export default InputBox;
