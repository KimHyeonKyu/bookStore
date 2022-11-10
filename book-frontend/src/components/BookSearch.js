import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BookImageBlock from "./common/BookImageBlock";

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

const StyledResult = styled.div`
  margin-top: 2em;
  font-size: 1.5rem;
  font-color: #6699ff;
  font-weight: 800;
  width: 100%;
`;

const StyledImageBlockWrap = styled.div`
  diplay: flex;
  width: 1600px;
  margin: 0 auto;
`;

const BookSearch = ({ query }) => {
  const [bookSelect, setBookSelect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchQuery = query === false ? "" : `&Query=${query}`;

        const reponse = await axios.get(
          `/ttb/api/ItemSearch.aspx?ttbkey=ttbdnjsvud651636001&Query=${searchQuery}&QueryType=Title&MaxResults=4&Cover=Big&start=1&SearchTarget=Book&output=js&Version=20131101`
        );
        setBookSelect(reponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [query]);

  if (!bookSelect) {
    return null;
  }

  return (
    <>
      <StyledHomeContentWrap>
        <StyledTitle> '{query}' 검색 결과</StyledTitle>
        <StyledImageBlockWrap>
          {!bookSelect.item[0] ? (
            <StyledResult>
              <p>
                -입력한 검색어의 철자 또는 띄어쓰기가 정확한지 다시 한번 확인해
                주세요.
              </p>
              <br></br>
              <p>
                -검색어의 단어 수를 줄이거나, 보다 일반적인 검색어를 사용하여
                검색해 보세요.
              </p>
            </StyledResult>
          ) : (
            bookSelect.item.map((book) => (
              <BookImageBlock key={book.title} bookData={book}></BookImageBlock>
            ))
          )}
        </StyledImageBlockWrap>
      </StyledHomeContentWrap>
    </>
  );
};

export default BookSearch;
