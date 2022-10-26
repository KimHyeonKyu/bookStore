import AuthTemplate from "../components/common/AuthTemplate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginContent from "../components/LoginContent";

const LoginPage = (props) => {
  
  return (
    <>
      <AuthTemplate>
        <Header />
        <LoginContent />
        <Footer />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
