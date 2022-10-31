import React from "react";
import styled from "styled-components";

const StyledTableWrap = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const ProDuctTable = ({ orderData }) => {
  return (
    <StyledTableWrap>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">주문일</th>
            <th scope="col">주문번호</th>
            <th scope="col">수령인</th>
            <th scope="col">주문상품</th>
            <th scope="col">가격(원)</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {orderData.map((data) => (
            <tr key={data.buyerDay}>
              <td>{data.buyerDay}</td>
              <td>{data._id}</td>
              <td>{data.buyerName}</td>
              <td>{data.bookName}</td>
              <td>{data.bookPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableWrap>
  );
};

export default ProDuctTable;
