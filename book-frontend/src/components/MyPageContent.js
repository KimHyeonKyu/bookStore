import React from "react";

import styled from "styled-components";
import Table from "./common/Table";

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
  return (
    <StyledMyPageContentWrap>
      <StyledPromoteWrap>
        <StyledPromoteTitle>...님 안녕하세요!</StyledPromoteTitle>
        <StyledBoxWrap>
          <StyledPromoteBox>
            <StyledPromoteBoxTitle>- 멤버십 등급 : ..</StyledPromoteBoxTitle>
            <StyledPromoteBoxContent>
              발라딘 멤버십 회원이 되시면 구매 금액의 1~3% 추가 마일리지 및 쿠폰
              혜택을 받으실 수 있습니다. (단 비국내도서 상품과 함께 주문시에만
              본 혜택이 적용됩니다.)
            </StyledPromoteBoxContent>
          </StyledPromoteBox>
          <StyledPromoteBox>
            <StyledPromoteBoxTitle>- 중고샵, 아직 안써보셨어요?</StyledPromoteBoxTitle>
            <StyledPromoteBoxContent>
            9천원에 구입한 신간베스트를 5천원에 다시 판매하는 기적. 발라딘 중고샵! 지금 가입하세요~!
            </StyledPromoteBoxContent>
          </StyledPromoteBox>
        </StyledBoxWrap>
      </StyledPromoteWrap>

      <StyledTitle>전체 주문 내역</StyledTitle>
      <Table />
    </StyledMyPageContentWrap>
  );
};

export default MyPageContent;
