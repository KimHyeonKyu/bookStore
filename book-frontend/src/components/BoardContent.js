import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import axios from "axios";

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
      <label>제목</label>

      <input name="subject" value={subject} type="text" onChange={onChange} />

      <label>작성자: {localStorage.getItem("userName")}</label>

      <label>내용</label>

      <textarea
        name="content"
        value={content}
        type="textarea"
        rows="10"
        onChange={onChange}
      />

      <Button type="small" data={nowDate.toLocaleString()} onClick={boardInput}>
        등록
      </Button>
    </>
  );
};

export default BoardContent;
