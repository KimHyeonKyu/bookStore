import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputText from "./common/InputText";
import DaumPostCode from "react-daum-postcode";
import RadioButton from "./common/RadioButton";
import Button from "./common/Button";
import axios from "axios";
import ErrorMessage from "./common/ErrorMessage";

const OrderProcessContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem;
  letter-spacing: 1px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem;
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & + & {
    margin-top: 3rem;
  }
`;

const StyledTitle = styled.div`
  font-size: 2rem;
  font-color: #6699ff;
  font-weight: 800;
  width: 100%;
  border-bottom: 2px solid #666699;
`;

const StyledSubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-color: #6699ff;
  font-weight: 600;
`;

const StyledTableWrap = styled.div`
  font-size: 1.4rem;
  text-align: center;
  vertical-align: center
  padding-right: 12rem;
  margin-top: 1rem;
`;

const PriceBlock = styled.div`
  font-weight: 600;
  text-align: left;
`;

const PriceStrong = styled.strong`
  color: #ec7063;
`;

const SubtitleLogo = styled.div`
  width: 1rem;
  height: 1.3rem;
  background-color: #6699ff;
  margin-right: 0.5rem;
`;

const TextWrap = styled.div`
  padding: 0.5rem;
`;

const OrderProcessContent = () => {
  const id = localStorage.getItem("id");
  const bookListJson = localStorage.getItem("bookList");
  const bookList = JSON.parse(bookListJson);
  const bookListPrice = localStorage.getItem("totalPrice");
  const pgTitle = localStorage.getItem("pgTitle");
  const memberJson = localStorage.getItem("member");
  const member = JSON.parse(memberJson);
  const [addressFirst, addressSeccond, addressThird] =
    member[0].address.split("/");
  const [address, setAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [visible, setVisible] = useState("false");
  const [placeStatus, setPlaceStatus] = useState("");
  const [giftStatus, setGiftStatus] = useState("");
  const [form, setForm] = useState({
    orderUser: "",
    receiveUser: "",
    phoneNumber: "",
    giftMessage: "",
  });
  const { orderUser, receiveUser, phoneNumber, giftMessage } = form;
  const [totalPrice, setTotalPrice] = useState(bookListPrice);
  const isOrderUserValid = orderUser.length >= 1;
  const isReceiveUserValid = receiveUser.length >= 1;
  const isAddressValid = address.length >= 1;
  const isPhoneNumberValid = phoneNumber.length >= 1;
  const isGiftMessageValid = giftMessage.length >= 1;
  const isTotalValid =
    isOrderUserValid &&
    isReceiveUserValid &&
    isAddressValid &&
    isPhoneNumberValid &&
    isGiftMessageValid;

  useEffect(() => {
    setForm({
      ...form,
      orderUser: member[0].userName,
      receiveUser: member[0].userName,
      phoneNumber: member[0].phoneNumber,
    });
    setZipCode(addressFirst);
    setFullAddress(addressSeccond);
    setAddress(addressThird);
  }, []);

  const mergeTotalAddress = (e) => {
    console.log(e.target.value);
    setAddress(zipCode + " " + fullAddress + " " + e.target.value);
  };

  const addressClick = (e) => {
    setVisible("true");
    e.preventDefault();
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

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = async (e) => {
    if (isTotalValid) {
      const { IMP } = window;
      IMP.init("imp14112312");
      const data = {
        pg: "html5_inicis", // PG???
        pay_method: "card", // ????????????
        merchant_uid: `mid_${new Date().getTime()}`, // ????????????
        amount: totalPrice, // ????????????
        name: pgTitle, // ?????????
        buyer_name: localStorage.getItem("userName"), // ????????? ??????
        buyer_tel: "01012341234", // ????????? ????????????
        buyer_email: "example@example", // ????????? ?????????
        buyer_addr: "????????? 661-16", // ????????? ??????
        buyer_postcode: "06018", // ????????? ????????????
      };

      IMP.request_pay(
        {
          name: data.name,
          amount: data.amount,
          buyer_name: data.buyer_name,
        },
        function callback(response) {
          if (response.success) {
            data.impUid = response.imp_uid;
            data.merchant_uid = response.merchant_uid;
            data.buyer_name = response.buyer_name;
            orderDone(data);
          } else {
            alert(`?????? ?????? : ${response.error_msg}`);
          }
        }
      );

      const orderDone = async (data) => {
        const buyerName = data.buyer_name;
        let date = new Date();
        let buyerDay =
          date.getFullYear() +
          "??? " +
          (date.getMonth() + 1) +
          "??? " +
          date.getDate() +
          "??? " +
          +date.getHours() +
          "??? " +
          date.getMinutes() +
          "???";

        const orderNumber = data.merchant_uid;
        let bookName = data.name;
        let bookPrice = data.amount;

        try {
          await axios.post("/api/order/input", {
            buyerDay,
            orderNumber,
            buyerName,
            bookName,
            bookPrice,
          });
          await axios.delete(`/api/basket/deleteItemList?id=${id}`);
          localStorage.removeItem("bookData");
          localStorage.removeItem("totalPrice");
          localStorage.removeItem("pgTitle");

          alert("?????? ??????");
        } catch (e) {
          console.log(e);
        }
      };
    } else {
      alert("????????? ?????? ????????? ?????????.");
    }
  };

  const handlerOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <OrderProcessContentWrap>
      <StyledTitle>????????????</StyledTitle>
      <ContentWrap>
        <ContentBlock>
          <StyledSubTitle>
            <SubtitleLogo />
            ?????? ?????? ??????
          </StyledSubTitle>
          <StyledTableWrap>
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">?????????</th>
                  <th scope="col">??????</th>
                  <th scope="col">??????</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {bookList.map((list) => (
                  <tr key={list._id}>
                    <td>{list.bookName}</td>
                    <td>{list.bookPrice}</td>
                    <td>{list.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PriceBlock>
              ??? ?????? ?????? ?????? : <PriceStrong>{totalPrice}</PriceStrong> ???{" "}
            </PriceBlock>
          </StyledTableWrap>
        </ContentBlock>

        <ContentBlock>
          <StyledSubTitle>
            <SubtitleLogo />
            ????????? ?????? ??????
          </StyledSubTitle>
          <StyledTableWrap>
            <table className="table table-bordered border-primary align-middle">
              <tbody>
                <tr>
                  <td className="table-info">????????? ??????</td>
                  <td>
                    <TextWrap>
                      <RadioButton
                        id="sameInform"
                        memberId={id}
                        text="???????????? ????????? ??????"
                        inputStatus={placeStatus}
                        setInputStatus={setPlaceStatus}
                        form={form}
                        setForm={setForm}
                        setZipCode={setZipCode}
                        setFullAddress={setFullAddress}
                        setAddress={setAddress}
                      />
                      <RadioButton
                        id="newInform"
                        text="??? ?????? ??????"
                        inputStatus={placeStatus}
                        setInputStatus={setPlaceStatus}
                        form={form}
                        setForm={setForm}
                        setZipCode={setZipCode}
                        setFullAddress={setFullAddress}
                        setAddress={setAddress}
                      />
                    </TextWrap>
                  </td>
                </tr>
                <tr>
                  <td className="table-info">?????????</td>
                  <td>
                    <InputText
                      name="orderUser"
                      value={orderUser}
                      onChange={handlerOnChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="table-info">???????????????</td>
                  <td>
                    <InputText
                      name="receiveUser"
                      value={receiveUser}
                      onChange={handlerOnChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="table-info">??????</td>
                  <td>
                    {visible === "true" && (
                      <DaumPostCode onComplete={handleComplete} />
                    )}
                    <div className="row g-3">
                      <div className="col-auto">
                        <InputText
                          type="address"
                          className="form-control"
                          id="inputPassword2"
                          placeholder="????????????"
                          inputValue={zipCode}
                        ></InputText>
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-primary mb-3"
                          onClick={addressClick}
                        >
                          ?????? ??????
                        </button>
                      </div>
                    </div>
                    <InputText
                      name="subAddress"
                      className="form-control"
                      placeholder="??????"
                      type="address"
                      inputValue={fullAddress}
                    ></InputText>
                    <InputText
                      className="form-control"
                      placeholder="????????????"
                      type="address"
                      inputValue={address}
                      onChange={mergeTotalAddress}
                    ></InputText>
                  </td>
                </tr>
                <tr>
                  <td className="table-info">??????????????????</td>
                  <td>
                    <InputText
                      name="phoneNumber"
                      placeholder="-?????? ???????????????."
                      value={phoneNumber}
                      onChange={handlerOnChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="table-info">?????? ????????????</td>
                  <td>
                    <TextWrap>
                      <RadioButton
                        type="gift"
                        id="radio3"
                        value={bookListPrice * 1}
                        text="????????? ???????????? ??????"
                        inputStatus={giftStatus}
                        setInputStatus={setGiftStatus}
                        setTotalPrice={setTotalPrice}
                      />
                      <RadioButton
                        type="gift"
                        id="radio4"
                        value={bookListPrice * 1 + 1500}
                        text="????????? ????????????(1500??? ??????)"
                        inputStatus={giftStatus}
                        setInputStatus={setGiftStatus}
                        setTotalPrice={setTotalPrice}
                      />
                    </TextWrap>
                  </td>
                </tr>
                <tr>
                  <td className="table-info">???????????????</td>
                  <td>
                    <InputText
                      name="giftMessage"
                      placeholder="????????? ???????????? ???????????????"
                      value={giftMessage}
                      onChange={handlerOnChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {!isTotalValid && (
              <ErrorMessage
                errorMessage="????????? ?????? ????????? ?????????."
                textAlign="center"
              />
            )}
            <Button onClick={onClickPayment}>????????????</Button>
          </StyledTableWrap>
        </ContentBlock>
      </ContentWrap>
    </OrderProcessContentWrap>
  );
};

export default OrderProcessContent;
