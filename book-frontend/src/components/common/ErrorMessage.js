import React from 'react';
import styled from 'styled-components';

const StyledErrorBox = styled.div`
  font-size: 1rem;
  color: red;
  margin-top: 0.5rem;
`;

const ErrorMessage = ({errorMessage}) => {
    return (
        <StyledErrorBox>{errorMessage}</StyledErrorBox>
    );
};

export default ErrorMessage;