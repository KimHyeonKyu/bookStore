import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import axios from "axios";
import styled from "styled-components";
import InputBox from "./common/InputBox";
import TextArea from "./common/TextArea";

const BoardReadWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const ContentWrap = styled.div`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
const ButtonWrap = styled.div`
  text-align: center;
`;

const BoardContent = ({ handleMain }) => {
  let nowDate = new Date();
  const [boardIn, setBoardIn] = useState({
    username: localStorage.getItem("userName"),
    subject: "",
    content: "",
    datetime: "",
  });

  const { username, subject, content, datetime } = boardIn;

  const onChange = (e) => {
    const { name, value } = e.target;
    setBoardIn({ ...boardIn, [name]: value });
  };

  const boardInput = (e) => {
    setBoardIn({ ...boardIn, datetime: e.target.value });
  };

  useEffect(() => {
    if (datetime) {
      try {
        axios.post("/api/board/input", {
          username,
          subject,
          content,
          datetime,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setBoardIn({ ...boardIn, subject: "", content: "", datetime: "" });
        handleMain();
      }
    }
  }, [datetime]);
  return (
    <>
      <BoardReadWrap>
        <ContentWrap>작성자:{localStorage.getItem("userName")}</ContentWrap>

        <InputBox
          name="subject"
          type="readOnly"
          value={subject}
          onChange={onChange}
          title="제목"
        />

        <TextArea
          name="content"
          type="readOnly"
          rows="10"
          value={content}
          onChange={onChange}
          title="내용"
        />
      </BoardReadWrap>
      <ButtonWrap>
        <Button
          data={nowDate.toLocaleString()}
          onClick={boardInput}
        >
          등록
        </Button>
      </ButtonWrap>
    </>
  );
};

export default BoardContent;
