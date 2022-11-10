import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BookContent from "../components/BookContent";
import { useNavigate, useParams } from "react-router-dom";
import BookSearch from "../components/BookSearch";
import { useEffect } from "react";

const BookPage = () => {
  const params = useParams();
  const categoryId = params.categoryId;
  const query = params.query;

  const navigator = useNavigate();
  const logOut = localStorage.getItem("logOut");
  
  useEffect(()=> {
    if( logOut === "true"){
      navigator("/");
      localStorage.clear();
    }
  }, [logOut])
 
  return (
    <>
      <AuthTemplate>
        <Header />
        {categoryId && <BookContent categoryId={categoryId} />}
        {query && <BookSearch query={query} />}
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default BookPage;
