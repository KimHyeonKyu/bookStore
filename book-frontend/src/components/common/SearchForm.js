import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

const LinkLink = styled(Link)``;

const SearchForm = ({ onChange, to, word }) => {
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${word}`);
    }
  };

  return (
    <StyledSerchFormWrap>
      <StyledInput
        type="text"
        placeholder="검색어 입력"
        onChange={onChange}
        onKeyPress={handleKeyPress}
      ></StyledInput>
      <LinkLink to={to}>
        <StyledImage src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></StyledImage>
      </LinkLink>
    </StyledSerchFormWrap>
  );
};

export default SearchForm;
