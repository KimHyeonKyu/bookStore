import axios from "axios";
import React, { useState } from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Banner from "../components/common/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

const HomePage = () => {

  const [loginStatus, setLoginStatus] = useState();

  axios.get("/api/auth/check").then((response) => {
    setLoginStatus(response.status);
  });

  return (
    <>
      <AuthTemplate>
        <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        <Banner />
        <HomeContent />
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default HomePage;
