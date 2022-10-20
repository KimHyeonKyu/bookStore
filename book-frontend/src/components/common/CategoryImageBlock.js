import React from "react";
import styled from "styled-components";

const StyledContentPartWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 13rem;
  margin-left: 5rem;
`;

const StyledCategoryImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gray;
  border-radius: 50%;
  width: 14rem;
  height: 14rem;
`;

const StyledImage = styled.img`
  width: 10rem;
  height: 10rem;
`;

const StyledCategoryTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  width: 20rem;
  text-align: center;
  margin-top: 1rem;
`;

const StyledCategoryContent = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
`;

const CategoryImageBlock = ({ imageSrc, title, content }) => {
  return (
    <StyledContentPartWrap>
      <StyledCategoryImageBlock>
        <StyledImage src={imageSrc}></StyledImage>
      </StyledCategoryImageBlock>
      <StyledCategoryTitle>{title}</StyledCategoryTitle>
      <StyledCategoryContent>
        {content}
      </StyledCategoryContent>
    </StyledContentPartWrap>
  );
};

export default CategoryImageBlock;
