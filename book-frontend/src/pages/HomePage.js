import React from "react";
import AuthTemplate from "../components/common/AuthTemplate";
import Banner from "../components/common/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

const HomePage = () => {
  return (
    <>
      <AuthTemplate>
        <Header />
        <Banner />
        <HomeContent />
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default HomePage;
