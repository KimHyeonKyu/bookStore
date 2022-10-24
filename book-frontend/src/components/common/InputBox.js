import React, { useState } from "react";
import styled from "styled-components";
import InputText from "./InputText";
import DaumPostCode from "react-daum-postcode";

const StyledInputBoxWrap = styled.div`
  margin-top: 1rem;
  font-size: 1.7rem;
`;

const StyledErrorBox = styled.div`
  font-size: 1rem;
  color: red;
  margin-top: 0.5rem;
`;

const InputBox = ({
  name,
  type,
  title,
  errorMessage,
  placeholder,
  value,
  onChange,
}) => {
  const [fullAddress, setFullAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

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
    <StyledInputBoxWrap>
      <div className="form-group">
        <label>{title}</label>
        {type !== "address" && (
          <InputText
            name={name}
            type={type}
            class="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          ></InputText>
        )}

        {type === "address" && (
          <>
            {visible === "true" && <DaumPostCode onComplete={handleComplete} />}
            <div className="row g-3">
              <div className="col-auto">
                <InputText
                  type={type}
                  class="form-control"
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
              type={type}
              class="form-control"
              placeholder="주소"
              inputValue={fullAddress}
              onChange={onChange}
            ></InputText>
            <InputText name={name} type={type} class="form-control" placeholder="상세주소"></InputText>
          </>
        )}
        <StyledErrorBox>{errorMessage}</StyledErrorBox>
      </div>
    </StyledInputBoxWrap>
  );
};

export default InputBox;
