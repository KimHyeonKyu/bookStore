import React from "react";
import styled from "styled-components";
import loginBackground from "../image/loginBackground.PNG";
import Button from "./common/Button";
import InputText from "./common/InputText";

const StyledLoginContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${loginBackground});
  background-size: cover;
  width: 100%;
  height: 100%;
  padding: 4rem;
`;

const StyledTitle = styled.div`
  padding-bottom: 2rem;
  font-size: 3rem;
  color: azure;
  text-align: center;
`;

const StyledLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60rem;
  height: 30rem;
  background: white;
`;

const StyledLoginBoxTitle = styled.div`
  font-size: 3rem;
  color: #6482ff;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const StyledErrorBox = styled.div`
  font-size: 1rem;
  color: red;
  margin-top: 0.5rem;
  text-align: center;
`;


const LoginContent = () => {
  return (
    <StyledLoginContentWrap>
      <StyledTitle>발라딘 로그인</StyledTitle>
      <StyledLoginBox>
        <StyledLoginBoxTitle>Log In</StyledLoginBoxTitle>
        <form>
          <InputText placeholder="발라딘 ID" />
          <InputText type="password" placeholder="비밀번호" />
          <StyledErrorBox>에러내용 넣을 곳</StyledErrorBox>
        <Button>로그인</Button>
        </form>
      </StyledLoginBox>
    </StyledLoginContentWrap>
  );
};

export default LoginContent;