import { postLogin } from "../api/login";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = ({ name, email }) => {
    postLogin({ name, email })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div className="container ">
      <div className="mt-4">
        <div className="text-center">
          <h1>Go Fetch!</h1>
          <p>
            Welcome to Go Fetch! Meet adoptable dogs and get matched with your
            new best friend. Login with a name and an email to continue.
          </p>
        </div>
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
