import React from "react";
import styled from "styled-components";
import logo from "../image/logo.png";

const StyledFooterWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  min-width: 1100px;
  width: 100%;
  height: 12rem;
  bottom: 0;
  letter-spacing: 1px;
  padding: 2rem;
  background: #CCCCCC;
`;

const StyledLogo = styled.img.attrs({
  src: `${logo}`,
})`
  margin-left: 1rem;
  width: 6rem;
  height: 6rem;
`;

const StyledFooterTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #6699ff;
  margin-right: 2rem;
  text-align: center;
`;

const StyledFooterContent = styled.div`
  font-size: 1rem;
`;

const Footer = () => {
  return (
    <StyledFooterWrap>
      <StyledFooterTitle>
        <StyledLogo /><br></br>
        발라딘
      </StyledFooterTitle>
      <StyledFooterContent>
        (주)발라딘<br></br>
        고객센터 : 1544-6333 ( AM 09:00 ~ PM 19:00 ) | FAX : 032-712-2742 |
        Email : help@nine2021.com<br></br>
        주소 : 경기도 부천시 조마루로385번길 92, 1901~1903호 (원미동,
        부천테크노밸리 유1센터) | 우편번호 : 14558<br></br>
        대표 : 배성원 | 사업자등록번호 : 585-88-01930<br></br>
        통신판매업 신고번호 제 2020-경기부천-4494 호<br></br>
        Copyright © JANET Corp. All Right Reserved.
      </StyledFooterContent>
    </StyledFooterWrap>
  );
};

export default Footer;
