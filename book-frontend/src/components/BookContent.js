import React from "react";
import styled from "styled-components";
import BookImageBlock from "./common/BookImageBlock";
import { useState, useEffect } from "react";
import axios from "axios";
import BookProduct from "./BookProduct";

const StyledHomeContentWrap = styled.div`
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
`;

const StyledImageBlockWrap = styled.div`
  diplay: flex;
  width: 1600px;
  margin: 0 auto;
`;

const BookContent = ({ categoryId, loginStatus }) => {
  const [bookData, setBookData] = useState(null);
  const [visible, setVisible] = useState("false");

  const testClick = (e) => {
    setVisible("true");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = categoryId === "null" ? "" : `&categoryId=${categoryId}`;

        const reponse = await axios.get(
          `/ttb/api/ItemList.aspx?ttbkey=ttbdnjsvud651636001&QueryType=ItemNewAll&MaxResults=4&cover=big&start=1&SearchTarget=Book${query}&output=js&Version=20131101`
        );
        setBookData(reponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [categoryId]);

  if (!bookData) {
    return null;
  }

  return (
    <StyledHomeContentWrap>
      {visible === "false" && (
        <>
          <StyledTitle>{bookData.searchCategoryName}</StyledTitle>
          <StyledImageBlockWrap>
            {bookData.item.map((bookData, index) => (
              <BookImageBlock
                key={bookData.title}
                bookData={bookData}
                onClick={testClick}
                index={index}
              />
            ))}
          </StyledImageBlockWrap>
        </>
      )}
      {visible === "true" && (
        <StyledImageBlockWrap>
          <BookProduct key={bookData.title} bookData={bookData.item[0]} loginStatus={loginStatus} />
        </StyledImageBlockWrap>
      )}
    </StyledHomeContentWrap>
  );
};

export default BookContent;
