import React from "react";
import styled from "styled-components";

const StyledTableWrap = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const ProductTable = () => {
  return (
    <StyledTableWrap>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">주문일</th>
            <th scope="col">주문번호</th>
            <th scope="col">수령인</th>
            <th scope="col">주문상품</th>
            <th scope="col">가격</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
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
  );
};

export default ProductTable;
