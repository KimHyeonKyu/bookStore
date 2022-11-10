import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import OrderProcessContent from "../components/OrderProcessContent";

const OrderProcessPage = () => {
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
        <OrderProcessContent />
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default OrderProcessPage;
