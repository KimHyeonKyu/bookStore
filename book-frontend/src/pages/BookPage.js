import React from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookContent from "../components/BookContent";
import { useParams } from "react-router-dom";
import BookSearch from "../components/BookSearch";

const BookPage = () => {
  const params = useParams();
  const categoryId = params.categoryId;
  const query = params.query;

  return (
    <>
      <AuthTemplate>
        <Header />
        {categoryId && <BookContent categoryId={categoryId} />}
        {query && <BookSearch query={query} />}
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default BookPage;
