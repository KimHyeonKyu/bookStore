import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Table from "./common/Table";
import BoardContent from "./BoardContent";
import BoardRead from "./BoardRead";

const StyledInquiryContentWrap = styled.div`
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

const CustomerInquiryContent = () => {
  const [boardList, setBoardList] = useState([]);
  const [state, setState] = useState({
    _id: "",
    search: { field: "", text: "" }, // 검색 상태
    isBoardState: "L", // L : 게시판 리스트, W : 게시판 작성 , R : 게시판 내용 읽기, U : 게시판 수정
    activePage: 1,
    totalItemsCount: 0,
    pageRangeDisplayed: 5,
    itemsCountPerPage: 5,
  });
  const handleDelete = async (e) => {
    try {
      await axios
        .delete(`/api/board/deleteItem?_id=${e.target.value}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      const response = await axios.get(
        `/api/board/outputPaging?page=${state.activePage}`
      );
      setBoardList(response.data);
      setState({ ...state, activePage: null });
    } catch (e) {
      console.log(e);
    }
  };

  const handleWrite = () => {
    const isBoardState = "W";
    setState({ ...state, activePage: 1, isBoardState: isBoardState });
  };

  const handleRead = (e) => {
    const isBoardState = "R";
    setState({
      ...state,
      activePage: 1,
      isBoardState: isBoardState,
      _id: e.target.value,
    });
  };

  const handlePageChange = (pageNumber) => {
    setState({ ...state, activePage: pageNumber });
  };

  const handleMain = () => {
    setState({ ...state, activePage: null, isBoardState: "L" });
  };

  useEffect(() => {
    axios.get(`/api/board/output`).then((response) => {
      setState({ ...state, totalItemsCount: response.data.length });
      console.log(state.totalItemsCount);
    });
    axios
      .get(`/api/board/outputPaging?page=${state.activePage}`)
      .then((response) => {
        console.log(response.data);
        setBoardList(response.data);
      });
  }, [state.activePage]);

  if (!boardList) {
    return null;
  }

  return (
    <StyledInquiryContentWrap>
      <StyledTitle>고객문의 게시판</StyledTitle>
      {state.isBoardState === "L" && (
        <Table
          onPageChange={handlePageChange}
          activePage={state.activePage}
          itemsCountPerPage={state.itemsCountPerPage}
          totalItemsCount={state.totalItemsCount}
          pageRangeDisplayed={state.pageRangeDisplayed}
          boardList={boardList}
          handleWrite={handleWrite}
          handleRead={handleRead}
          handleDelete={handleDelete}
        />
      )}
      {state.isBoardState === "W" && <BoardContent handleMain={handleMain} />}
      {state.isBoardState === "R" && (
        <BoardRead _id={state._id} handleMain={handleMain} />
      )}
    </StyledInquiryContentWrap>
  );
};

export default CustomerInquiryContent;
