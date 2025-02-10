import Auth from "../auth";
import LoginForm from "src/components/forms/Login/Login";

const LoginPage = () => {
  return (
    <Auth
      data-testid="authentication-login"
      title="Sign In"
      desc="Enter your email address and password to access dashboard panel."
    >
      <LoginForm />
    </Auth>
  );
};

export default LoginPage;
