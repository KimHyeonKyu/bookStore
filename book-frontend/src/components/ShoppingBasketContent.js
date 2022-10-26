import React, { useState } from "react";
import styled from "styled-components";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import SelectBox from "./common/SelectBox";
import Button from "./common/Button";

const ShoppingBasketContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  letter-spacing: 1px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-color: #6699ff;
  font-weight: 800;
  width: 100%;
  border-bottom: 2px solid #666699;
`;

const TitleEmphasis = styled.div`
  font-size: 2rem;
  color: #4169e1;
  padding-right: 0.5rem;
`;
const StyledTableWrap = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;
const StyledSelector = styled.select`
  width: 10rem;
`;

const ShoppingBasketContent = (props) => {
  const [checkState, setCheckState] = useState("blank");
  const options = [
    { value: 1, name: 1 },
    { value: 2, name: 2 },
    { value: 3, name: 3 },
  ];


  const changeCheckBox = () => {
    setCheckState("isFull");
  };

  const changeBlankBox = () => {
    setCheckState("blank");
  };

  return (
    <ShoppingBasketContentWrap>
      <StyledTitle>
        <TitleEmphasis>발라딘</TitleEmphasis> 장바구니
      </StyledTitle>
      <StyledTableWrap>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">체크</th>
              <th scope="col">상품명</th>
              <th scope="col">가격</th>
              <th scope="col">수량</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td>
                {checkState === "isFull" && (
                  <MdCheckBox size="32" onClick={changeBlankBox} />
                )}
                {checkState === "blank" && (
                  <MdCheckBoxOutlineBlank size="32" onClick={changeCheckBox} />
                )}
              </td>
              <td>상품 사진 및 상품명 넣을 곳</td>
              <td>가격 넣을 곳</td>
              <td>
                <SelectBox options={options} />
              </td>
              <td><Button type="small">삭제</Button></td>
            </tr>
            <tr>
              <td>1번</td>
              <td>2번</td>
              <td>3번</td>
              <td>4번</td>
              <td>5번</td>
            </tr>
            <tr>
              <td>1번</td>
              <td>2번</td>
              <td>3번</td>
              <td>4번</td>
              <td>5번</td>
            </tr>
            <tr>
              <td>1번</td>
              <td>2번</td>
              <td>3번</td>
              <td>4번</td>
              <td>5번</td>
            </tr>
            <tr>
              <td>1번</td>
              <td>2번</td>
              <td>3번</td>
              <td>4번</td>
              <td>5번</td>
            </tr>
            <tr>
              <td>1번</td>
              <td>2번</td>
              <td>3번</td>
              <td>4번</td>
              <td>5번</td>
            </tr>
            <tr>
              <td>1번</td>
              <td>2번</td>
              <td>3번</td>
              <td>4번</td>
              <td>5번</td>
            </tr>
          </tbody>
        </table>
      </StyledTableWrap>
    </ShoppingBasketContentWrap>
  );
};

export default ShoppingBasketContent;
