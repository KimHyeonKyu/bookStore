import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import BookPage from "./pages/BookPage";
import CustomerInquiryPage from "./pages/CustomerInquiryPage";
import HomePage from "./pages/HomePage";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import OrderProcessPage from "./pages/OrderProcessPage";
import ShoppingBasketPage from "./pages/ShoppingBasketPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/customerInquiry" element={<CustomerInquiryPage />} />
      <Route path="/category/:categoryId" element={<BookPage />} />
      <Route path="/shoppingBasket" element={<ShoppingBasketPage />} />
      <Route path="/search/:query" element={<BookPage />} />
      <Route path="/orderProcess" element={<OrderProcessPage />} />
    </Routes>
  );
};

export default App;
