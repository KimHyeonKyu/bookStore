import React from 'react';
import styled from 'styled-components';

const StyledInputTextWrap = styled.div`
    & + & {
        margin-top: 0.5rem;
    }
`;

const InputText = ({ type, placeholder, inputValue }) => {
    return (
        <StyledInputTextWrap>
            <input 
            type={type}
            class="form-control form-control-lg"
            placeholder={placeholder}
            value={inputValue}
          ></input>
        </StyledInputTextWrap>
    );
};

export default InputText;