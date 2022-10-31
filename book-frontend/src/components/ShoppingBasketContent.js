import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import SelectBox from "./common/SelectBox";
import Button from "./common/Button";
import axios from "axios";
import CheckBox from "./common/CheckBox";
import { useNavigate } from "react-router-dom";

const ShoppingBasketContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  letter-spacing: 1px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-color: #6699ff;
  font-weight: 800;
  width: 100%;
  border-bottom: 2px solid #666699;
`;

const TitleEmphasis = styled.div`
  font-size: 2rem;
  color: #4169e1;
  padding-right: 0.5rem;
`;
const StyledTableWrap = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const TotalPriceBlock = styled.div`
  text-align: right;
  padding: 0.5rem;
  margin-right: 3rem;
  font-size: 2rem;
  font-weight: 600;
  border-bottom: 1px solid gray;
`;

const ShoppingBasketContent = () => {
  const options = [
    { value: 1, name: 1 },
    { value: 2, name: 2 },
    { value: 3, name: 3 },
  ];
  const [basketList, setBasketList] = useState([]);
  const [checkLogin, setCheckLogin] = useState("");
  const [pgTitle, setPgTitle] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkItem, setCheckItem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("/api/auth/check").then((response) => {
          setCheckLogin(response.data._id);
        });
        if (checkLogin !== "") {
          let response = await axios.get(`/api/basket/output?id=${checkLogin}`);

          setBasketList(response.data);
          setPgTitle(
            response.data[0].bookName +
              "외 " +
              (response.data.length - 1) +
              "권"
          );
          return response.data;
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [checkLogin]);

  useEffect(() => {
    let total = 0;
    basketList.map(
      (basketList) => (
        (total = total + basketList.bookPrice * basketList.quantity),
        setTotalPrice(total)
      )
    );

    return () => {};
  }, [basketList, totalPrice]);

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
    let total = 0;
    basketList.map(
      (basketList) => (
        (total = total + basketList.bookPrice * basketList.quantity),
        setTotalPrice(total)
      )
    );

    const { IMP } = window;
    IMP.init("imp14112312");
    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 100, // 결제금액
      name: pgTitle, // 주문명
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
    let date = new Date();
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

  const deleteItem = async (e) => {
    try {
      await axios.delete(`/api/basket/deleteItem?_id=${checkItem}`);
      let response = await axios.get(`/api/basket/output?id=${checkLogin}`);

      setBasketList(response.data);
    } catch (e) {
      console.log(e);
    }
    console.log(checkItem);
  };

  return (
    <ShoppingBasketContentWrap>
      <StyledTitle>
        <TitleEmphasis>발라딘</TitleEmphasis> 장바구니
      </StyledTitle>
      <StyledTableWrap>
        {checkLogin === "" && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">체크</th>
                <th scope="col">상품명</th>
                <th scope="col">가격</th>
                <th scope="col">수량</th>
                <th scope="col">삭제</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>로그인 후 이용 가능</td>
                <td>로그인 후 이용 가능</td>
                <td>로그인 후 이용 가능</td>
                <td>로그인 후 이용 가능</td>
                <td>로그인 후 이용 가능</td>
              </tr>
            </tbody>
          </table>
        )}

        {checkLogin !== "" && (
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">체크</th>
                  <th scope="col">상품명</th>
                  <th scope="col">가격</th>
                  <th scope="col">수량</th>
                  <th scope="col">삭제</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {checkLogin === "" && (
                  <tr>
                    <td>로그인 후 이용 가능</td>
                    <td>로그인 후 이용 가능</td>
                    <td>로그인 후 이용 가능</td>
                    <td>로그인 후 이용 가능</td>
                    <td>로그인 후 이용 가능</td>
                  </tr>
                )}
                {basketList.map((basketList) => (
                  <tr key={basketList._id}>
                    <td>
                      <CheckBox
                        basketList={basketList}
                        setCheckItem={setCheckItem}
                      />
                    </td>
                    <td>{basketList.bookName}</td>
                    <td>{basketList.bookPrice}</td>
                    <td>
                      <SelectBox
                        options={options}
                        basketList={basketList}
                        setBasketList={setBasketList}
                        checkLogin={checkLogin}
                      />
                    </td>
                    <td>
                      <Button type="small" onClick={deleteItem}>
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TotalPriceBlock>총 가격 : {totalPrice}</TotalPriceBlock>
            <br></br>
            <Button type="middle" onClick={onClickPayment}>
              구매하기
            </Button>
          </>
        )}
      </StyledTableWrap>
    </ShoppingBasketContentWrap>
  );
};

export default ShoppingBasketContent;
