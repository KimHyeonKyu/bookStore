import axios from 'axios';
import React, { useState } from 'react';
import AuthTemplate from '../components/common/AuthTemplate';
import CustomerInquiryContent from '../components/CustomerInquiryContent';
import Footer from '../components/Footer';
import Header from '../components/Header';

const CustomerInquiryPage = () => {
      
  const [loginStatus, setLoginStatus] = useState();

  axios.get("/api/auth/check").then((response) => {
    setLoginStatus(response.status);
  });
  
    return (
        <AuthTemplate>
        <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        <CustomerInquiryContent />
        <Footer />
      </AuthTemplate>
    );
};

export default CustomerInquiryPage;