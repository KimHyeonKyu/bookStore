import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MyPageContent from "../components/MyPageContent";

const MyPage = () => {

  const navigator = useNavigate();
  const logOut = localStorage.getItem("logOut");
  
  useEffect(()=> {
    if( logOut === "true"){
      localStorage.clear();
      navigator("/");
    }
  }, [logOut])
 
  return (
    <AuthTemplate>
      <Header />
      <MyPageContent />
      <Footer />
    </AuthTemplate>
  );
};

export default MyPage;
