import React from "react";
import styled from "styled-components";
import loginBackground from "../image/loginBackground.PNG";
import Button from "./common/Button";
import InputBox from "./common/InputBox";


const StyledJoinContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledImageTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${loginBackground});
  background-size: cover;
  opacity: 0.7;
  height: 12rem;
  width: 100%;
`;

const StyledTitle = styled.div`
  color: azure;
  font-size: 2.3rem;
  font-weight: 600;
  letter-spacing: 2px;
`;

const StyledContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  border: 2px dashed black;
  margin: 2rem;
  padding: 1.5rem;
`;

const JoinContent = () => {
  return (
    <StyledJoinContentWrap>
      <StyledImageTitle>
        <StyledTitle>Register</StyledTitle>
      </StyledImageTitle>
      <StyledContentWrap>
        <form>
          <InputBox
            title="아이디"
            errorMessage="아이디 오류"
            placeholder="아이디"
          />
          <InputBox
            type="password"
            title="비밀번호"
            errorMessage="비밀번호 오류"
            placeholder="비밀번호"
          />
          <InputBox
            type="password"
            title="비밀번호 확인"
            errorMessage="비밀번호 확인 오류"
            placeholder="비밀번호 확인"
          />
          <InputBox
            title="성함"
            errorMessage="성함 오류"
            placeholder="성함"
          />
          <InputBox
            title="연락처"
            errorMessage="연락처 오류"
            placeholder="연락처(-빼고 입력)"
          />
          <InputBox
          type="address"
            title="주소"
            errorMessage="주소 오류"
            placeholder="우편번호"
          />
          <InputBox
            title="이메일"
            errorMessage="이메일 오류"
            placeholder="이메일을 입력하세요"
          />
          <Button>Submit</Button>
        </form>
      </StyledContentWrap>
    </StyledJoinContentWrap>
  );
};

export default JoinContent;
