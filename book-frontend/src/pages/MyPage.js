import React from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MyPageContent from "../components/MyPageContent";

const MyPage = () => {
  return (
      <AuthTemplate>
        <Header />
        <MyPageContent />
        <Footer />
      </AuthTemplate>
  );
};

export default MyPage;
