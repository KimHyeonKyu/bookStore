import axios from "axios";
import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  width: 40rem;
  height: 4rem;
  background-color: hotpink;
  border-radius: 20px;
  font-size: 2rem;
  color: aliceblue;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: pink;
  }
  ${(props) =>
    props.type === "small" &&
    css`
      width: 6rem;
      height: 2rem;
      font-size: 1.2rem;
      & + & {
        margin: 0.5rem;
      }
    `}
  ${(props) =>
    props.type === "middle" &&
    css`
      width: 10rem;
      height: 3rem;
      font-size: 1.5rem;
      & + & {
        margin-left: 3rem;
        margin-right: 3rem;
      }
    `}
`;

const Button = ({
  data, children,
  type,
  onClick,
  basketPart,
  checkLogin,
  setBasketList,
  setPgTitle,
  status,
}) => {

  const deleteBasketItem = async (e) => {
    try {
      await axios.delete(`/api/basket/deleteItem?_id=${basketPart._id}`);

      let response = await axios.get(`/api/basket/output?id=${checkLogin}`);

      setBasketList(response.data);
      setPgTitle(
        response.data[0].bookName + "외 " + (response.data.length - 1) + "권"
      );
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <>
      {!status && (
        <StyledButton value={data} type={type} onClick={onClick}>
          {children}
        </StyledButton>
      )}

      {status === "map" && (
        <StyledButton type={type} onClick={deleteBasketItem}>
          {children}
        </StyledButton>
      )}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    </>
  );
};

export default Button;
