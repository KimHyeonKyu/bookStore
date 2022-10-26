import React, { useRef, useState } from "react";
import styled from "styled-components";
import loginBackground from "../image/loginBackground.PNG";
import Button from "./common/Button";
import InputBox from "./common/InputBox";
import axios from "axios";
import InputText from "./common/InputText";
import DaumPostCode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./common/ErrorMessage";

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

const StyledAddressWrap = styled.div`
  margin-top: 1rem;
`;

const JoinContent = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  const isIdValid = id.length >= 1;
  const isPasswordValid = password.length >= 1;
  const isPasswordConfirmValid = passwordConfirm.length >= 1;
  const isUserNameValid = userName.length >= 1;
  const isPhoneNumberValid = phoneNumber.length >= 1;
  const isAddressValid = address.length >= 1;
  const isEmailValid = email.length >= 1;

  const changeId = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
  };

  const changePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const changePasswordConfirm = (e) => {
    console.log(e.target.value);
    setPasswordConfirm(e.target.value);
  };

  const changeUserName = (e) => {
    console.log(e.target.value);
    setUserName(e.target.value);
  };

  const changePhoneNumber = (e) => {
    console.log(e.target.value);
    setPhoneNumber(e.target.value);
  };

  const mergeTotalAddress = (e) => {
    console.log(e.target.value);
    setAddress(zipCode + " " + fullAddress + " " + e.target.value);
  };

  const changeEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", {
        id,
        password,
        userName,
        phoneNumber,
        address,
        email,
      });

      alert("회원가입 성공");
      navigate("/");
    } catch (error) {
      console.log(error.response.status);
      setErrorStatus(error.response.status);
    }
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let zipCode = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFullAddress(fullAddress);
    setZipCode(zipCode);
  };

  const [visible, setVisible] = useState("false");
  const addressClick = (e) => {
    setVisible("true");
    e.preventDefault();
  };

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
            placeholder="아이디"
            value={id}
            onChange={changeId}
          />
          {!isIdValid && <ErrorMessage errorMessage="아이디를 입력해 주세요" />}
          {errorStatus === 409 && (
            <ErrorMessage errorMessage="이미 사용중인 아이디입니다." />
          )}
          <InputBox
            name="password"
            type="password"
            title="비밀번호"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
          />
          {!isPasswordValid && (
            <ErrorMessage errorMessage="패스워드를 입력해 주세요" />
          )}
          <InputBox
            name="password"
            type="password"
            title="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={changePasswordConfirm}
          />
          {!isPasswordConfirmValid && (
            <ErrorMessage errorMessage="패스워드를 입력해 주세요" />
          )}
          {passwordConfirm !== "" && password !== passwordConfirm && (
            <ErrorMessage errorMessage="패스워드가 일치하지 않습니다." />
          )}
          <InputBox
            name="userName"
            title="성함"
            placeholder="성함"
            value={userName}
            onChange={changeUserName}
          />
          {!isUserNameValid && (
            <ErrorMessage errorMessage="이름을 입력해 주세요" />
          )}
          <InputBox
            name="phoneNumber"
            title="연락처"
            placeholder="연락처(-빼고 입력)"
            value={phoneNumber}
            onChange={changePhoneNumber}
          />
          {!isPhoneNumberValid && (
            <ErrorMessage errorMessage="연락처를 입력해 주세요" />
          )}

          <StyledAddressWrap>
            {visible === "true" && <DaumPostCode onComplete={handleComplete} />}
            <div className="row g-3">
              <div className="col-auto">
                <InputText
                  type="address"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="우편번호"
                  inputValue={zipCode}
                ></InputText>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary mb-3" onClick={addressClick}>
                  주소 검색
                </button>
              </div>
            </div>
            <InputText
              name="subAddress"
              className="form-control"
              placeholder="주소"
              type="address"
              inputValue={fullAddress}
            ></InputText>
            <InputText
              className="form-control"
              placeholder="상세주소"
              type="address"
              onChange={mergeTotalAddress}
            ></InputText>
          </StyledAddressWrap>
          {!isAddressValid && (
            <ErrorMessage errorMessage="주소를 입력해 주세요" />
          )}
          <InputBox
            name="email"
            title="이메일"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={changeEmail}
          />
          {!isEmailValid && (
            <ErrorMessage errorMessage="이메일을 입력해 주세요" />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </StyledContentWrap>
    </StyledJoinContentWrap>
  );
};

export default JoinContent;
