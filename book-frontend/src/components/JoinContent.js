import React, { useState } from "react";
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
  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    phoneNumber: "",
    email: "",
  });

  const [address, setAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  const { id, password, passwordConfirm, userName, phoneNumber, email } = form;
  const isIdValid = id.length >= 1;
  const isPasswordValid = password.length >= 1;
  const isPasswordConfirmValid = passwordConfirm.length >= 1;
  const isUserNameValid = userName.length >= 1;
  const isPhoneNumberValid = phoneNumber.length >= 1;
  const isAddressValid = address.length >= 1;
  const isEmailValid = email.length >= 1;
  const isSamePasswordValid = password === passwordConfirm;
  const totalValid =
    isIdValid &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    isUserNameValid &&
    isPhoneNumberValid &&
    isAddressValid &&
    isEmailValid &&
    isSamePasswordValid;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const mergeTotalAddress = (e) => {
    setAddress(zipCode + "/" + fullAddress + "/" + e.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if(totalValid && errorStatus !== 409){
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
    }else{
      alert("오류메세지를 확인해 주세요.");
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
          />
          {!isPasswordValid && (
            <ErrorMessage errorMessage="패스워드를 입력해 주세요" />
          )}
          <InputBox
            name="passwordConfirm"
            type="password"
            title="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={handleOnChange}
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
            onChange={handleOnChange}
          />
          {!isUserNameValid && (
            <ErrorMessage errorMessage="이름을 입력해 주세요" />
          )}
          <InputBox
            name="phoneNumber"
            title="연락처"
            placeholder="연락처(-빼고 입력)"
            value={phoneNumber}
            onChange={handleOnChange}
          />
          {!isPhoneNumberValid && (
            <ErrorMessage errorMessage="연락처를 입력해 주세요" />
          )}

          <StyledAddressWrap>
            {visible === "true" && <DaumPostCode onComplete={handleComplete} />}
            <div className="row g-3">
              <div className="col-auto">
                <InputText
                  name="zipCode"
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
              name="fullAddress"
              className="form-control"
              placeholder="주소"
              type="address"
              inputValue={fullAddress}
            ></InputText>
            <InputText
              name="address"
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
            onChange={handleOnChange}
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
