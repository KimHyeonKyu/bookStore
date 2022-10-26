import React, { useState } from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookContent from "../components/BookContent";
import { useParams } from "react-router-dom";
import BookSearch from "../components/BookSearch";
import axios from "axios";

const BookPage = () => {
  const params = useParams();
  const categoryId = params.categoryId;
  const query = params.query;

  const [loginStatus, setLoginStatus] = useState("");

  axios.get("/api/auth/check").then((response) => {
    setLoginStatus(response.status);
  });

  return (
    <>
      <AuthTemplate>
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        {categoryId && <BookContent categoryId={categoryId} loginStatus={loginStatus}/>}
        {query && <BookSearch query={query} />}
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default BookPage;
