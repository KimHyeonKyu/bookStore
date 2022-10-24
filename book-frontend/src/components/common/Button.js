import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 40rem;
  height: 4rem;
  background-color: hotpink;
  border-radius: 20px;
  font-size: 2rem;
  color: aliceblue;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: pink;
  }
`;

const Button = ({children, type, onClick }) => {
    return (
        <StyledButton type={type} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

export default Button;