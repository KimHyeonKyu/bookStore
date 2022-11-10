import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./common/Button";

const BookProduct = ({ bookData }) => {
  let date = new Date();
  
  const [ id, setCheckLogin ] = useState("");

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


  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp14112312");
    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `a_${new Date().getTime()}`, // 주문번호
      amount: bookData.priceStandard, // 결제금액
      name: bookData.title, // 주문명
      buyer_name: localStorage.getItem("userName"), // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
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
          alert(`결제 실패 : ${response.error_msg}`);
        }
      }
    );
  };

  const orderDone = async (data) => {
    const buyerName = data.buyer_name;
    let buyerDay =
      date.getFullYear() +
      "년 " +
      (date.getMonth() + 1) +
      "월 " +
      date.getDate() +
      "일 " +
      +date.getHours() +
      "시 " +
      date.getMinutes() +
      "분";

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
      alert("주문 완료");
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();

  axios.get("/api/auth/check").then((response) => {
    setCheckLogin(response.data._id);
    console.log(response.data._id);
  });

  const onClickShoppingBasket = async (e) => {
    let bookName = bookData.title;
    let bookPrice = bookData.priceStandard;
    let quantity = 1;
    let checkState = "isFull";
    let bookImage = bookData.cover;

    try {
      axios.post("/api/basket/input", {
        id,
        bookName,
        bookPrice,
        quantity,
        checkState,
        bookImage
      });
      navigate("/shoppingBasket");
    } catch (error) {
      console.log(error.response.status);
    }
  };

  return (
    <>
      <ContentRel>
        <InnerWMobileFull>
          <UiSlider src={bookData.cover}></UiSlider>

          <StickyAsideDiv>
            <StickyAsideProducTitle>{bookData.title}</StickyAsideProducTitle>

            <PriceTagD>
              <PriceTagStrong>
                <Strong>{bookData.priceStandard}</Strong>원
              </PriceTagStrong>
            </PriceTagD>

            <DataRow>
              <DataRowTable>
                <tbody>
                  <DataRowTr>
                    <TitleTd>적립금</TitleTd>
                    <ContenetTd>
                      <span>
                        최대 <DataRowSpan>35P</DataRowSpan>
                      </span>
                    </ContenetTd>
                  </DataRowTr>
                </tbody>

                <tbody>
                  <DataRowTr>
                    <TitleTd>구매후기</TitleTd>
                    <ContenetTd>*****</ContenetTd>
                  </DataRowTr>
                </tbody>
                <tbody>
                  <DataRowTr>
                    <TitleTd>배송비</TitleTd>
                    <ContenetTd>
                      <span>무료</span>
                    </ContenetTd>
                  </DataRowTr>
                </tbody>

                <tbody>
                  <DataRowTr>
                    <TitleTd>배송 기간</TitleTd>
                    <ContenetTd>평균 1일</ContenetTd>
                  </DataRowTr>
                </tbody>
              </DataRowTable>
            </DataRow>

            <DataRow>
              <DataRowTable>
                <tbody>
                  <DataRowTr>
                    <TitleTd>제품 소개</TitleTd>
                    <ContenetTd>{bookData.description}</ContenetTd>
                  </DataRowTr>
                </tbody>
              </DataRowTable>
            </DataRow>

            <CheckoutProductCostDl>
              총 작품금액 :
              <CheckoutProductCostDlContent>
                {bookData.priceStandard}
              </CheckoutProductCostDlContent>
            </CheckoutProductCostDl>

            <CheckOutProduct>
              <Button type="middle" onClick={onClickShoppingBasket}>
                장바구니
              </Button>
              <Button type="middle" onClick={onClickPayment}>
                구매하기
              </Button>
            </CheckOutProduct>
          </StickyAsideDiv>
        </InnerWMobileFull>
      </ContentRel>
    </>
  );
};

const ContentRel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  font-size: 1.2rem;
`;

const InnerWMobileFull = styled.div`
  display: flex;
  justify-content: center;
`;

const UiSlider = styled.img`
  width: 23rem;
  height: 35rem;
  margin-right: 5rem;
  display: list-item;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  &:first-child {
    display: block;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const StickyAsideDiv = styled.div`
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 #0000001a;
  border: solid 1px #f5f5f5;
  width: 70rem;
  height: 35rem;
`;

const StickyAsideProducTitle = styled.div`
  font-size: 2rem;
  letter-spacing: 1px;
  color: #6699ff;
  font-weight: 500;
  margin-bottom: 12px;
`;

const PriceTagD = styled.div`
  margin-bottom: 8px;
`;

const PriceTagStrong = styled.span`
  padding-right: 6px;
  color: #333;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const DataRow = styled.div`
  padding-bottom: 8px;
  position: relative;
`;

const DataRowTable = styled.table`
  table-layout: fixed;
  width: 100%;
  box-sizing: border-box;
`;

const DataRowTr = styled.tr`
  color: inherit;
  font-size: inherit;
`;

const TitleTd = styled.td`
  width: 7rem;
  color: #666666;
`;

const ContenetTd = styled.td`
  color: #333333;
  width: 50rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const DataRowSpan = styled.span`
  font-weight: bold;
`;

const CheckoutProductCostDl = styled.div`
  display: flex;
  padding-top: 16px;
  width: 100%;
  vertical-align: middle;
  text-align: left;

  font-size: 1.4rem;
`;

const CheckoutProductCostDlContent = styled.div`
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CheckOutProduct = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  border: 0 none;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

export default BookProduct;
