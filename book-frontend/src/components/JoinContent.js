import React, { useState } from "react";
import styled from "styled-components";
import loginBackground from "../image/loginBackground.PNG";
import Button from "./common/Button";
import InputBox from "./common/InputBox";
import axios from "axios";

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
  const [id, setId ] = useState();
  const [ password, setPassword ] = useState();
  const [ passwordConfirm, setPasswordConfirm ] = useState();
  const [ userName, setUserName ] = useState();
  const [ phoneNumber, setPhoneNumber ] = useState();
  const [ address, setAddress ] = useState();
  const [ email, setEmail ] = useState();

  const changeId = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const changePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }

  const changeUserName = (e) => {
    setUserName(e.target.value);
  }

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  }

  const changeAddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = async e => {
    e.preventDefault();
    
    try{
      await axios.post("/api/auth/register", 
      { id, password, userName, phoneNumber, address, email })
      alert("회원가입 성공");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <StyledJoinContentWrap>
      <StyledImageTitle>
        <StyledTitle>Register</StyledTitle>
      </StyledImageTitle>
      <StyledContentWrap>
        <form onSubmit={onSubmit}>
          <InputBox
            name="id"
            title="아이디"
            errorMessage="아이디 오류"
            placeholder="아이디"
            value={id}
            onChange={changeId}
          />
          <InputBox
            name="password"
            type="password"
            title="비밀번호"
            errorMessage="비밀번호 오류"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
          />
          <InputBox
            name="password"
            type="password"
            title="비밀번호 확인"
            errorMessage="비밀번호 확인 오류"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={changePasswordConfirm}
          />
          <InputBox
            name="userName"
            title="성함"
            errorMessage="성함 오류"
            placeholder="성함"
            value={userName}
            onChange={changeUserName}
          />
          <InputBox
            name="phoneNumber"
            title="연락처"
            errorMessage="연락처 오류"
            placeholder="연락처(-빼고 입력)"
            value={phoneNumber}
            onChange={changePhoneNumber}
          />
          <InputBox
          name="address"
          type="address"
            title="주소"
            errorMessage="주소 오류"
            placeholder="우편번호"
            value={address}
            onChange={changeAddress}
          />
          <InputBox
          name="email"
            title="이메일"
            errorMessage="이메일 오류"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={changeEmail}
          />
          <Button type="submit">Submit</Button>
        </form>
      </StyledContentWrap>
    </StyledJoinContentWrap>
  );
};

export default JoinContent;
