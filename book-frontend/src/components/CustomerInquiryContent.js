import React from 'react';

import styled from 'styled-components';
import Table from './common/Table';

const StyledInquiryContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  letter-spacing: 1px;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-color: #6699ff;
  font-weight: 800;
  width: 100%;
  border-bottom: 2px solid #666699;
`;

const CustomerInquiryContent = () => {
    return (
        <StyledInquiryContentWrap>
            <StyledTitle>고객문의 게시판</StyledTitle>
            <Table />
        </StyledInquiryContentWrap>
    );
};

export default CustomerInquiryContent;