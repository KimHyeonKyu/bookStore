import React from 'react';
import AuthTemplate from '../components/common/AuthTemplate';
import CustomerInquiryContent from '../components/CustomerInquiryContent';
import Footer from '../components/Footer';
import Header from '../components/Header';

const CustomerInquiryPage = () => {
    return (
        <AuthTemplate>
        <Header />
        <CustomerInquiryContent />
        <Footer />
      </AuthTemplate>
    );
};

export default CustomerInquiryPage;