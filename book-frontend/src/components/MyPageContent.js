import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductTable from "./common/ProductTable";
import axios from "axios";

const StyledMyPageContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  letter-spacing: 1px;
`;
const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-color: #6699ff;
  font-weight: 800;
  width: 100%;
  border-bottom: 2px solid #666699;
  margin-top: 4rem;
`;

const StyledPromoteWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #b0e0e6;
  padding: 2rem;
  width: 80rem;
  margin: 0 auto;
`;

const StyledPromoteTitle = styled.div`
  font-size: 1.4rem;
  color: #4169e1;
  margin-bottom: 2rem;
`;

const StyledBoxWrap = styled.div`
  display: flex;
`;

const StyledPromoteBox = styled.div`
  background: white;
  padding: 2rem;
  width: 35rem;
  &:last-child {
    margin-left: 1rem;
  }
`;

const StyledPromoteBoxTitle = styled.div`
  font-size: 1.2rem;
  color: #4169e1;
  border-bottom: 1px solid #4169e1;
`;

const StyledPromoteBoxContent = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
`;

const MyPageContent = () => {
  const [orderData, setOrderData] = useState([]);
  const userName = localStorage.getItem("userName");
  let point = null;
  orderData.map((data) => (point += (Number(data.bookPrice) / 100)));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `/api/order/output?userName=${userName}`
        );
        setOrderData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [userName]);

  return (
    <StyledMyPageContentWrap>
      <StyledPromoteWrap>
        <StyledPromoteTitle>
          {localStorage.getItem("id")}님 안녕하세요!
        </StyledPromoteTitle>
        <StyledBoxWrap>
          <StyledPromoteBox>
            {point === null && (
              <>
                <StyledPromoteBoxTitle>
                  - 멤버십 등급 : ..
                </StyledPromoteBoxTitle>
                <StyledPromoteBoxContent>
                  발라딘 멤버십 회원이 되시면 구매 금액의 1~3% 추가 마일리지 및
                  쿠폰 혜택을 받으실 수 있습니다. (단 비국내도서 상품과 함께
                  주문시에만 본 혜택이 적용됩니다.)
                </StyledPromoteBoxContent>
              </>
            )}
            {point !== null && point < 500 && (
              <>
                <StyledPromoteBoxTitle>
                  - 멤버십 등급 : 실버
                </StyledPromoteBoxTitle>
                <StyledPromoteBoxContent>
                  <ul>
                    <li>
                      1,000원 쿠폰 : '정가제 Free상품' 1천원 이상 포함 2만원
                      이상 주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      2,000원 쿠폰 :'정가제 Free상품' 2천원 이상 포함 4만원 이상
                      주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      모바일 전용 2,000원 쿠폰 : 모바일에서 '정가제 Free상품'
                      2천원 이상 포함 3만원 이상 주문시 사용 가능, 다른 멤버십
                      쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      주문금액의 1% 마일리지 적립 (최대 '정가제 Free상품'
                      주문금액 만큼)
                    </li>
                    <li>CGV 4천원 영화 할인권 1매</li>
                  </ul>
                </StyledPromoteBoxContent>
              </>
            )}
            {point > 500 && point < 1000 && (
              <>
                <StyledPromoteBoxTitle>
                  - 멤버십 등급 : 골드
                </StyledPromoteBoxTitle>
                <StyledPromoteBoxContent>
                  <ul>
                    <li>
                      1,000원 쿠폰 : '정가제 Free상품' 1천원 이상 포함 2만원
                      이상 주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가{" "}
                    </li>
                    <li>
                      2,000원 쿠폰 :'정가제 Free상품' 2천원 이상 포함 4만원 이상
                      주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      2,500원 쿠폰 :'정가제 Free상품' 2천 5백원 이상 포함 6만원
                      이상 주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      모바일 전용 2,000원 쿠폰 : 모바일에서 '정가제 Free상품'
                      2천원 이상 포함 3만원 이상 주문시 사용 가능, 다른 멤버십
                      쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      주문금액의 2% 마일리지 적립 (최대 '정가제 Free상품'
                      주문금액 만큼)
                    </li>
                    <li> CGV 4천원 영화 할인권 1매</li>
                  </ul>
                </StyledPromoteBoxContent>
              </>
            )}
            {point > 1000 && (
              <>
                <StyledPromoteBoxTitle>
                  - 멤버십 등급 : 플레티넘
                </StyledPromoteBoxTitle>
                <StyledPromoteBoxContent>
                  <ul>
                    <li>
                      1,000원 쿠폰 :'정가제 Free상품' 1천원 이상 포함 2만원 이상
                      주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      2,000원 쿠폰 :'정가제 Free상품' 2천원 이상 포함 4만원 이상
                      주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가{" "}
                    </li>
                    <li>
                      2,500원 쿠폰 :'정가제 Free상품' 2천 5백원 이상 포함 6만원
                      이상 주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가{" "}
                    </li>
                    <li>
                      3,000원 쿠폰 : '정가제 Free상품' 3천원 이상 포함 8만원
                      이상 주문시 사용 가능, 다른 멤버십 쿠폰과 중복 사용 불가{" "}
                    </li>
                    <li>
                      모바일 전용 2,000원 쿠폰 : 모바일에서 '정가제 Free상품'
                      2천원 이상 포함 3만원 이상 주문시 사용 가능, 다른 멤버십
                      쿠폰과 중복 사용 불가
                    </li>
                    <li>
                      주문금액의 3% 마일리지 적립 (최대 '정가제 Free상품'
                      주문금액 만큼)
                    </li>
                    <li> CGV 4천원 영화 할인권 1매</li>
                  </ul>
                </StyledPromoteBoxContent>
              </>
            )}
          </StyledPromoteBox>
          <StyledPromoteBox>
            <StyledPromoteBoxTitle>
              - 중고샵, 아직 안써보셨어요?
            </StyledPromoteBoxTitle>
            <StyledPromoteBoxContent>
              9천원에 구입한 신간베스트를 5천원에 다시 판매하는 기적. 발라딘
              중고샵! 지금 가입하세요~!
            </StyledPromoteBoxContent>
          </StyledPromoteBox>
        </StyledBoxWrap>
      </StyledPromoteWrap>

      <StyledTitle>전체 주문 내역</StyledTitle>
      <ProductTable orderData={orderData} />
    </StyledMyPageContentWrap>
  );
};

export default MyPageContent;
