import axios from 'axios';
import React, { useState } from 'react';
import AuthTemplate from '../components/common/AuthTemplate';

import Footer from '../components/Footer';
import Header from '../components/Header';
import ShoppingBasketContent from '../components/ShoppingBasketContent';

const ShoppingBasketPage = () => {
    
  const [loginStatus, setLoginStatus] = useState();

  axios.get("/api/auth/check").then((response) => {
    setLoginStatus(response.status);
  });


    return (
        <>
      <AuthTemplate>
        <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        <ShoppingBasketContent />        
        <Footer />
      </AuthTemplate>
    </>
    );
};

export default ShoppingBasketPage;