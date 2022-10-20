import React from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookContent from "../components/BookContent";
import { useParams } from "react-router-dom";

const BookPage = () => {
  const params = useParams();
  const categoryId = params.categoryId || "null";

  return (
    <>
      <AuthTemplate>
        <Header />
        <BookContent categoryId={categoryId} />
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default BookPage;
