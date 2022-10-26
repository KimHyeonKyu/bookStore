import React from 'react';
import styled from 'styled-components';

const StyledErrorBox = styled.div`
  font-size: 1rem;
  color: red;
  margin-top: 0.5rem;
  text-align: ${props => props.textAlign || 'left'};
`;

const ErrorMessage = ({errorMessage, textAlign}) => {
    return (
        <StyledErrorBox textAlign={textAlign}>{errorMessage}</StyledErrorBox>
    );
};

export default ErrorMessage;