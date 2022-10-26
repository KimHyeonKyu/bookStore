import React, { useState } from "react";
import styled from "styled-components";
import BookProduct from "../BookProduct";

const StyledImageBlock = styled.div`
  display: inline-block;
  width: 20rem;
  cursor: pointer;
  text-align: center;
  margin-top: 4rem;
  margin-left: 1rem;
  & + & {
    margin-left: 4rem;
  }
  &:hover {
    opacity: 0.7;
  }
`;

const StyledImageBlockWrap = styled.div`
  diplay: flex;
  width: 1600px;
  margin-top: 3rem;
`;

const StyledImage = styled.img`
  width: 20rem;
  height: 20rem;
  border: 1px solid black;
`;

const StyledImageContent = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  text-align: left;
  padding-left: 1rem;
  letter-spacing: 0px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;

const BookImageBlock = ({ bookData, onClick, index }) => {
  const [visible, setVisible] = useState("false");

  const imageClick = (e) => {
    setVisible("true");
  };

  return (
    <>
      {visible === "false" && (
        <StyledImageBlock onClick={imageClick}>
          <StyledImage src={bookData.cover} />

          <StyledImageContent>
            책 제목 : {bookData.title}
            <br></br>
            지은이 : {bookData.author}
            <br></br>
            가격 : {bookData.priceStandard}원<br></br>
          </StyledImageContent>
        </StyledImageBlock>
      )}
      {visible === "true" && (
        <StyledImageBlockWrap>
          <BookProduct key={bookData.title} bookData={bookData} />
        </StyledImageBlockWrap>
      )}
    </>
  );
};

export default BookImageBlock;
