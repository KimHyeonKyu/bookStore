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

const ButtonWrap = styled.div`
  margin-top: 2rem;
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
    setErrorStatus("");
  };

  const mergeTotalAddress = (e) => {
    setAddress(zipCode + "/" + fullAddress + "/" + e.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(errorStatus);
    if (totalValid === true && errorStatus !== 409) {
      try {
        await axios.post("/api/auth/register", {
          id,
          password,
          userName,
          phoneNumber,
          address,
          email,
        });

        alert("???????????? ??????");
        navigate("/");
      } catch (error) {
        setErrorStatus(error.response.status);
        alert("?????????????????? ????????? ?????????.");
      }
    }else{
      alert("?????????????????? ????????? ?????????.");
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
            title="?????????"
            placeholder="?????????"
            value={id}
            onChange={handleOnChange}
          />
          {!isIdValid && <ErrorMessage errorMessage="???????????? ????????? ?????????" />}
          {errorStatus === 409 && (
            <ErrorMessage errorMessage="?????? ???????????? ??????????????????." />
          )}
          <InputBox
            name="password"
            type="password"
            title="????????????"
            placeholder="????????????"
            value={password}
            onChange={handleOnChange}
          />
          {!isPasswordValid && (
            <ErrorMessage errorMessage="??????????????? ????????? ?????????" />
          )}
          <InputBox
            name="passwordConfirm"
            type="password"
            title="???????????? ??????"
            placeholder="???????????? ??????"
            value={passwordConfirm}
            onChange={handleOnChange}
          />
          {!isPasswordConfirmValid && (
            <ErrorMessage errorMessage="??????????????? ????????? ?????????" />
          )}
          {passwordConfirm !== "" && password !== passwordConfirm && (
            <ErrorMessage errorMessage="??????????????? ???????????? ????????????." />
          )}
          <InputBox
            name="userName"
            title="??????"
            placeholder="??????"
            value={userName}
            onChange={handleOnChange}
          />
          {!isUserNameValid && (
            <ErrorMessage errorMessage="????????? ????????? ?????????" />
          )}
          <InputBox
            name="phoneNumber"
            title="?????????"
            placeholder="?????????(-?????? ??????)"
            value={phoneNumber}
            onChange={handleOnChange}
          />
          {!isPhoneNumberValid && (
            <ErrorMessage errorMessage="???????????? ????????? ?????????" />
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
                  placeholder="????????????"
                  inputValue={zipCode}
                ></InputText>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary mb-3" onClick={addressClick}>
                  ?????? ??????
                </button>
              </div>
            </div>
            <InputText
              name="fullAddress"
              className="form-control"
              placeholder="??????"
              type="address"
              inputValue={fullAddress}
            ></InputText>
            <InputText
              name="address"
              className="form-control"
              placeholder="????????????"
              type="address"
              onChange={mergeTotalAddress}
            ></InputText>
          </StyledAddressWrap>
          {!isAddressValid && (
            <ErrorMessage errorMessage="????????? ????????? ?????????" />
          )}
          <InputBox
            name="email"
            title="?????????"
            placeholder="???????????? ???????????????"
            value={email}
            onChange={handleOnChange}
          />
          {!isEmailValid && (
            <ErrorMessage errorMessage="???????????? ????????? ?????????" />
          )}
          <ButtonWrap>
            <Button type="submit">Submit</Button>
          </ButtonWrap>
        </form>
      </StyledContentWrap>
    </StyledJoinContentWrap>
  );
};

export default JoinContent;
