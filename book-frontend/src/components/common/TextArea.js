import React from "react";
import styled from "styled-components";

const StyledInputBoxWrap = styled.div`
  margin-top: 1rem;
  font-size: 1.7rem;
`;

const TextArea = ({
    ref,
    name,
    type,
    rows,
    value,
    onChange,
    readOnly,
    title,
}) => {
  return (
    <StyledInputBoxWrap>
    <label>{title}</label>
    <div className="form-floating">
      <textarea
        className="form-control h-25"
        id="floatingTextarea"
        ref={ref}
        name={name}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        row="10"
      ></textarea>
    </div>
    </StyledInputBoxWrap>
  );
};

export default TextArea;
