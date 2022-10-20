import React from 'react';
import styled from 'styled-components';

const StyledImageBlock = styled.div`
  display: inline-block;
  width: 20rem;
  cursor: pointer;
  text-align: center;
  margin-top: 4rem;
  & + & {
    margin-left: 2rem;
  }
  &:hover{
    opacity: 0.7;
  }
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

const ImageBlock = ({imgSource, title, author}) => {
    return (
        <StyledImageBlock>
        <StyledImage src={imgSource}/>
        <StyledImageContent>
            책 제목 : {title}<br></br>
            지은이 : {author}<br></br>
        </StyledImageContent>
      </StyledImageBlock>
    );
};

export default ImageBlock;