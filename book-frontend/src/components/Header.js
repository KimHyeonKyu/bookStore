import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../image/logo.png";
import SearchForm from "./common/SearchForm";

const StyledHeaderWrap = styled.div`
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  background: #6699ff;
  height: 5rem;
  min-width: 1700px;
`;

const StyledHeaderTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: azure;
  margin-left: 1rem;
  margin-right: 8rem;
`;

const StyledLogo = styled.img.attrs({
  src: `${logo}`,
})`
  margin-left: 1rem;
  width: 4rem;
  height: 4rem;
`;

const StyledHeaderMenu = styled(Link)`
  font-size: 1.5rem;
  color: azure;
  & + & {
    margin-left: 3rem;
  }
`;

const StyledSubHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 2px solid #666699;
`;

const StyledSubHeaderMenu = styled(NavLink)`
  font-size: 1.2rem;
  color: #6699ff;
  font-weight: 800;
  &:hover {
    color: #495057;
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  & + & {
    margin-left: 3rem;
  }
`;

const categories = [
  {
    name: "socialbook",
    text: "소설책",
    id: "50917",
  },
  {
    name: "comicbook",
    text: "만화책",
    id: "2551",
  },
  {
    name: "fairytalebook",
    text: "동화책",
    id: "48810",
  },
  {
    name: "picturebook",
    text: "그림책",
    id: "48824",
  },
];

const Header = () => {

  const logout = () => {
    localStorage.setItem("logOut", "true");
    axios.post("/api/auth/logout");
  };
  const [word, setWord] = useState();

  const changeSearchWord = (e) => {
    setWord(e.target.value);
  };

  return (
    <StyledHeaderWrap>
      <StyledHeader>
        <StyledLogo></StyledLogo>
        <StyledHeaderTitle to="/">발라딘</StyledHeaderTitle>

        <SearchForm
          onChange={changeSearchWord}
          to={`../search/${word}`}
          word={word}
        />
        {!localStorage.getItem("id") && (
          <StyledHeaderMenu to="/login">로그인</StyledHeaderMenu>
        )}
        {localStorage.getItem("id") && (
          <StyledHeaderMenu onClick={logout}>로그아웃</StyledHeaderMenu>
        )}
        <StyledHeaderMenu to="/join">회원가입</StyledHeaderMenu>
        <StyledHeaderMenu to="/myPage">마이페이지</StyledHeaderMenu>
        <StyledHeaderMenu to="/customerInquiry">고객문의</StyledHeaderMenu>
        <StyledHeaderMenu to="/shoppingBasket">장바구니</StyledHeaderMenu>
      </StyledHeader>
      <StyledSubHeader>
        {categories.map((categories) => (
          <StyledSubHeaderMenu
            key={categories.id}
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to={categories.id === null ? "/" : `/category/${categories.id}`}
          >
            {categories.text}
          </StyledSubHeaderMenu>
        ))}
      </StyledSubHeader>
    </StyledHeaderWrap>
  );
};

export default Header;
