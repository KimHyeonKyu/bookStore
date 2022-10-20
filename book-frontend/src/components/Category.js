import React from "react";
import styled from "styled-components";
import CategoryImageBlock from "./common/CategoryImageBlock";
import socialBookImage from "C:/Users/user/bookStore/book-frontend/src/image/socialBook.png";
import comicBookImage from "C:/Users/user/bookStore/book-frontend/src/image/comicBook.png";
import fairytaleBookImage from "C:/Users/user/bookStore/book-frontend/src/image/fairytaleBook.png";
import pictureBookImage from "C:/Users/user/bookStore/book-frontend/src/image/pictureBook.png";

const StyledCategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
`;

const StyledTitle = styled.div`
  font-size: 2rem;
  font-color: #6699ff;
  font-weight: 700;
`;

const StyledContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 13rem;
`;

const Category = () => {
  return (
    <StyledCategoryWrap>
      <StyledTitle>Books Categories</StyledTitle>
      <a href="https://www.flaticon.com/kr/free-icons/" title="도서 아이콘">
        도서 아이콘 제작자: Freepik - Flaticon
      </a>
      <StyledContentWrap>
        <CategoryImageBlock
          imageSrc={socialBookImage}
          title="소설책"
          content="작가의 상상력 또는 사실에 바탕을 두고 주로 허구로 이야기를 꾸며 나간
        산문체의 문학 양식"
        />
        <CategoryImageBlock
          imageSrc={comicBookImage}
          title="만화책"
          content="이야기 따위를 간결하고 익살스럽게 그린 그림. 대화를 삽입하여 나타낸 양식"
        />
        <CategoryImageBlock
          imageSrc={fairytaleBookImage}
          title="동화책"
          content="어린이를 위하여 동심(童心)을 바탕으로 지은 이야기를 나타낸 양식"
        />
        <CategoryImageBlock
          imageSrc={pictureBookImage}
          title="그림책"
          content="어린이를 위하여 주로 그림으로 꾸민 책."
        />
      </StyledContentWrap>
    </StyledCategoryWrap>
  );
};

export default Category;
