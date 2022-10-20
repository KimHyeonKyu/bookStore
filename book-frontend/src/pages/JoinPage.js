import React from 'react';
import AuthTemplate from '../components/common/AuthTemplate';
import Footer from '../components/Footer';
import Header from '../components/Header';
import JoinContent from '../components/JoinContent';

const JoinPage = () => {
    return (
        <>
        <AuthTemplate>
          <Header />
          <JoinContent />
          <Footer />
        </AuthTemplate>
        
      </>
    );
};

export default JoinPage;