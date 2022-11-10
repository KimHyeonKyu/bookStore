import React from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const StyledPaing = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px !important;
  }
  ul {
    list-style: none;
    padding: 0 !important;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem !important;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px !important;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0 !important;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem !important;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7 !important;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue !important;
  }
  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7 !important;
  }
`;

const PagingMoudle = ({
  onPageChange,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
}) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <>
      <StyledPaing>
        <Pagination
          onChange={handlePageChange}
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
        />
      </StyledPaing>
    </>
  );
};

export default PagingMoudle;
