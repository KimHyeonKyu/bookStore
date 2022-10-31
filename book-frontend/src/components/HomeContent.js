import React from "react";
import styled from "styled-components";
import firstImage from "../image/bestSellerFirst.PNG";
import SecondImage from "../image/bestSellerSecond.PNG";
import ThirdImage from "../image/bestSellerThird.PNG";
import FourthImage from "../image/bestSellerFourth.PNG";
import ImageBlock from "./common/ImageBlock";
import Category from "./Category";

const StyledHomeContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem;
  letter-spacing: 1px;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-color: #6699ff;
  font-weight: 800;
  width: 100%;
  border-bottom: 2px solid #666699;
`;

const StyledImageBlockWrap = styled.div`
  diplay: flex;
  margin: 0 auto;
  width: 1400px;
`;

const HomeContent = () => {
  return (
    <StyledHomeContentWrap>
      <Category></Category>
      <StyledTitle>인기 베스트 셀러</StyledTitle>
      <StyledImageBlockWrap>
        <ImageBlock imgSource={firstImage} title="모순" author="양귀자" />
        <ImageBlock
          imgSource={SecondImage}
          title="보건교사 안은영"
          author="정세랑"
        />
        <ImageBlock
          imgSource={ThirdImage}
          title="아버지에게 갔었어"
          author="신은영"
        />
        <ImageBlock
          imgSource={FourthImage}
          title="달까지 가자"
          author="장류진"
        />
      </StyledImageBlockWrap>
    </StyledHomeContentWrap>
  );
};

export default HomeContent;
