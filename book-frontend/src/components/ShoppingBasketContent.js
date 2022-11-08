import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

const ImageBlock = styled.img`
  width: 7rem;
  height: 7rem;
  padding: 0.5rem;
  margin-right: 1rem;
`;

const StyledTr = styled.tr`
  vertical-align: middle;
`;
const StyledTd = styled.td`
  text-align: left;
`;

const ShoppingBasketContent = () => {
  const options = [
    { value: 1, name: 1 },
    { value: 2, name: 2 },
    { value: 3, name: 3 },
  ];
  const [basketList, setBasketList] = useState([]);
  const [pgTitle, setPgTitle] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const checkLogin = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    if(basketList.length === 0){
      setTotalPrice(0);
    }
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

  const navigate = new useNavigate();

  const onClickPayment = async (e) => {
    if(basketList.length === 0){
      alert("장바구니에 담아주세요.");
    }else{
      let response = await axios.get(`/api/auth/output?id=${checkLogin}`);
    
      localStorage.setItem("bookList", JSON.stringify(basketList));
      localStorage.setItem("totalPrice", totalPrice);
      localStorage.setItem("pgTitle", pgTitle);
      localStorage.setItem("member", JSON.stringify(response.data));
      navigate("/orderProcess");
    }
  };

  return (
    <ShoppingBasketContentWrap>
      <StyledTitle>
        <TitleEmphasis>발라딘</TitleEmphasis> 장바구니
      </StyledTitle>
      <StyledTableWrap>
        {!checkLogin && (
          <table className="table table-striped align-middle">
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

        {checkLogin && (
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
                {basketList.map((basketPart) => (
                  <StyledTr key={basketPart._id}>
                    <td>
                      <CheckBox
                        type="basketList"
                        basketPart={basketPart}
                        setBasketList={setBasketList}
                        checkLogin={checkLogin}
                      />
                    </td>
                    <StyledTd><ImageBlock src={basketPart.bookImage} />{basketPart.bookName}</StyledTd>
                    <td>{basketPart.bookPrice}</td>
                    <td>
                      <SelectBox
                        options={options}
                        basketPart={basketPart}
                        setBasketList={setBasketList}
                        checkLogin={checkLogin}
                      />
                    </td>
                    <td>
                      <Button
                        type="small"
                        basketList={basketList}
                        basketPart={basketPart}
                        checkLogin={checkLogin}
                        setBasketList={setBasketList}
                        setPgTitle={setPgTitle}
                        status="map"
                      >
                        삭제
                      </Button>
                    </td>
                  </StyledTr>
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
