import React from "react";
import styled from "styled-components";

const StyledSerchFormWrap = styled.div`
  position: relative;
  width: 500px;
  margin-right: 5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
`;

const StyledImage = styled.img`
  position: absolute;
  width: 17px;
  top: 10px;
  right: 12px;
  margin: 0;
  cursor: pointer;
`;

const SearchForm = () => {
  return (
    <StyledSerchFormWrap>
      <StyledInput type="text" placeholder="검색어 입력"></StyledInput>
      <StyledImage src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></StyledImage>
    </StyledSerchFormWrap>
  );
};

export default SearchForm;
