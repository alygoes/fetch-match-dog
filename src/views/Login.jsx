import { useState } from "react";
import { postLogin } from "../api/login";
import Button from "react-bootstrap/Button";
import { FormControl, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = () => {
  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test@test.com");
  const navigate = useNavigate()

  const onSubmit = () => {
    postLogin({ name, email })
      .then((res) => {
        console.log(res);
        navigate("/")
      })
      .catch(console.error);
    console.log("submitted");
    //handle errors
  };

  return (
    <div className="container">
      
      <div>
        <h1>Go Fetch</h1>
        <p>Welcome to Go Fetch! Meet adoptable dogs and get matched with your new best  friend. Login to continue.</p>
        <FormLabel>Name</FormLabel>
        <FormControl
          type="text"
          value={name || ""}
          onChange={(e) => {
            setName(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div>
        <FormLabel>Email</FormLabel>
        <FormControl
          type="email"
          value={email || ""}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="mt-3">
        <Button type="button" onClick={onSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
