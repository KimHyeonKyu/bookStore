import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthTemplate from "../components/common/AuthTemplate";
import CustomerInquiryContent from "../components/CustomerInquiryContent";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CustomerInquiryPage = () => {
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
      <CustomerInquiryContent />
      <Footer />
    </AuthTemplate>
  );
};

export default CustomerInquiryPage;

