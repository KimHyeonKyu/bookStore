import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthTemplate from "../components/common/AuthTemplate";
import Banner from "../components/common/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

const HomePage = () => {
  const navigator = useNavigate();
  const logOut = localStorage.getItem("logOut");

  useEffect(()=> {
    if( logOut === "true"){
      localStorage.clear();
      navigator("/");
    }
  }, [logOut])
 
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
