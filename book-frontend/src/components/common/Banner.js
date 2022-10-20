import React from "react";
import styled from "styled-components";
import bannerImage from "C:/Users/user/bookStore/book-frontend/src/image/slider-img.png";

const Banner = () => {
  const StyledBannerWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 2rem;
  `;

  const StyledBannerImage = styled.img`
    width: 20rem;
    height: 20rem;
  `;

  const StyledBannerContentWrap = styled.div`
    text-align: left;
    margin-right: 3rem;
  `;

  const StyledContentTitle = styled.div`
    font-size: 1.3rem;
    color: #00ced1;
    font-weight: 600;
  `;

  const StyledContentFirst = styled.div`
    margin-top: 1rem;
    font-size: 3rem;
    line-height: 2.8rem;
  `;

  const StyledContentSecond = styled.div`
    margin-top: 2rem;
    font-size: 1rem;
    color: #6699ff;
  `;

  return (
    <StyledBannerWrap>
      <StyledBannerContentWrap>
        <StyledContentTitle>발라딘 중고서점</StyledContentTitle>
        <StyledContentFirst>
          For All Your <br></br>
          Reading Needs
        </StyledContentFirst>
        <StyledContentSecond>
          발라딘은 국내 최고 중고서점 판매업체 입니다.<br></br>" 책을 사느라
          들인 돈은 결코 손해가 아니다.<br></br>
          오히려 훗날에 만 배의 이익을 얻게 될 것이다. " - 왕안석
        </StyledContentSecond>
      </StyledBannerContentWrap>

      <StyledBannerImage src={bannerImage} />
    </StyledBannerWrap>
  );
};

export default Banner;
