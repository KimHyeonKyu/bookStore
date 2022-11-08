import React, { useEffect, useState, useRef } from "react";
import Button from "./common/Button";
import axios from "axios";
import styled from "styled-components";

const BoardReadWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
const ButtonBlock = styled.div`
  margin-left: 1rem;
`;

const BoardRead = ({ handleMain, _id }) => {
  const [boardIn, setBoardIn] = useState({
    username: localStorage.getItem("userName"),
    subject: "",
    content: "",
  });
  const [datetime, setDatetime] = useState();
  const { username, subject, content } = boardIn;
  const inputE1 = useRef();
  const inputE2 = useRef();
  const [readBoard, setReadBoard] = useState();
  const home = () => {
    handleMain();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/board/readBoard?_id=${_id}`);
        setReadBoard(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [_id]);

  const updateItem = (e) => {
    document.getElementsByName("subject")[0].readOnly = false;
    document.getElementsByName("content")[0].readOnly = false;
    inputE1.current.focus();
    setBoardIn({
      ...boardIn,
      subject: inputE1.current.value,
      content: inputE2.current.value,
    });
    console.log(inputE1.current.value);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setBoardIn({ ...boardIn, [name]: value });
  };

  const updateBoard = async () => {
    let nowDate = new Date();
    setDatetime(nowDate.toLocaleString());
    try {
      await axios.post(`/api/board/updateBoard?_id=${_id}`, {
        username,
        subject,
        content,
        datetime,
      });
      alert("수정 완료");
    } catch (e) {
      console.log(e);
    }
  };

  if (!readBoard) {
    return null;
  }
  const check = localStorage.getItem("userName") === readBoard[0].username;

  return (
    <BoardReadWrap>
      <label>제목</label>

      <input
        ref={inputE1}
        name="subject"
        type="text"
        defaultValue={readBoard[0].subject}
        onChange={onChange}
        readOnly
      />

      <label>작성자:{readBoard[0].username}</label>

      <label>내용</label>

      <textarea
        ref={inputE2}
        name="content"
        type="textarea"
        rows="10"
        defaultValue={readBoard[0].content}
        onChange={onChange}
        readOnly
      />
      <ButtonWrap>
        <Button type="small" onClick={home}>
          목록
        </Button>
        {check && (
          <>
            <ButtonBlock>
              <Button type="small" onClick={updateItem}>
                수정
              </Button>
            </ButtonBlock>
            <ButtonBlock>
              <Button type="small" onClick={updateBoard}>
                저장
              </Button>
            </ButtonBlock>
          </>
        )}
      </ButtonWrap>
    </BoardReadWrap>
  );
};

export default BoardRead;
