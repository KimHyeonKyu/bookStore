import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "./Button";
import PagingMoudle from "./PagingMoudle";

const StyledTableWrap = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const Table = ({
  boardList,
  onPageChange,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  handleWrite,
  handleRead,
  handleDelete,
}) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handlePageWrite = () => {
    handleWrite();
  };
  const handlePageRead = (e) => {
    handleRead(e);
  };

  const handleDeleteItem = (e) => {
    handleDelete(e);
  };

  return (
    <StyledTableWrap>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">내용</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {activePage &&
            boardList.map((data, index) => (
              <tr key={data._id}>
                <td>{(activePage - 1) * 5 + index + 1}</td>
                <td>{data.subject}</td>
                <td>{data.content}</td>
                <td>{data.username}</td>
                <td>{data.datetime}</td>
                <td>
                  <Button type="small" data={data._id} onClick={handlePageRead}>
                    보기
                  </Button>
                  <Button
                    data={data._id}
                    type="small"
                    onClick={handleDeleteItem}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          {!activePage &&
            boardList.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.subject}</td>
                <td>{data.content}</td>
                <td>{data.username}</td>
                <td>{data.datetime}</td>
                <td>
                  <Button type="small" data={data._id} onClick={handlePageRead}>
                    보기
                  </Button>
                  <Button
                    data={data._id}
                    type="small"
                    onClick={handleDeleteItem}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PagingMoudle
        onPageChange={handlePageChange}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
      />
      <Button type="small" variant="danger" onClick={handlePageWrite}>
        작성
      </Button>
    </StyledTableWrap>
  );
};
export default Table;
