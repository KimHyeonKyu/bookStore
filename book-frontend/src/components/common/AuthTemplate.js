import React from "react";
import styled from "styled-components";

const StyledTemplate = styled.div`
  height: 100vh;
`;

const AuthTemplate = ({ children }) => {
  return <StyledTemplate>{children}</StyledTemplate>;
};

export default AuthTemplate;
