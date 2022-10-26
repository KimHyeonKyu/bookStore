import axios from "axios";
import React, { useState } from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JoinContent from "../components/JoinContent";

const JoinPage = () => {

  const [loginStatus, setLoginStatus] = useState();

  axios.get("/api/auth/check").then((response) => {
    setLoginStatus(response.status);
  });
  
  return (
    <>
      <AuthTemplate>
        <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        <JoinContent />
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default JoinPage;
