import React, { useState } from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MyPageContent from "../components/MyPageContent";
import axios from "axios";

const MyPage = () => {
  const [loginStatus, setLoginStatus] = useState();

  axios.get("/api/auth/check").then((response) => {
    setLoginStatus(response.status);
  });
  return (
    <AuthTemplate>
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <MyPageContent />
      <Footer />
    </AuthTemplate>
  );
};

export default MyPage;
