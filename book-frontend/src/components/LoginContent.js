import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginBackground from "../image/loginBackground.PNG";
import Button from "./common/Button";
import ErrorMessage from "./common/ErrorMessage";
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

const ButtonWrap = styled.div`
  margin-top: 2rem;
`;

const LoginContent = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        id,
        password,
      });
      localStorage.clear();
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("userName", response.data.userName);
      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.log(error.response.status);
      setErrorStatus(error.response.status);
    }
  };

  return (
    <StyledLoginContentWrap>
      <StyledTitle>발라딘 로그인</StyledTitle>
      <StyledLoginBox>
        <StyledLoginBoxTitle>Log In</StyledLoginBoxTitle>
        <form onSubmit={onSubmit}>
          <InputText placeholder="발라딘 ID" value={id} onChange={changeId} />
          <InputText
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
          />
          {errorStatus === 401 && (
            <ErrorMessage
              errorMessage="아이디와 비밀번호가 일치하지 않습니다."
              textAlign="center"
            />
          )}
          <ButtonWrap>
            <Button>로그인</Button>
          </ButtonWrap>
        </form>
      </StyledLoginBox>
    </StyledLoginContentWrap>
  );
};

export default LoginContent;
