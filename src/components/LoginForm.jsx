import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FormControl, FormLabel } from "react-bootstrap";

const LoginForm = ({ handleLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    handleLogin({ name, email });
  };
  return (
    <div>
      <div>
        <FormLabel htmlFor="name-input">Name</FormLabel>
        <FormControl
          id="name-input"
          type="text"
          value={name || ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <FormLabel htmlFor="email-input">Email</FormLabel>
        <FormControl
          id="email-input"
          type="email"
          value={email || ""}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="mt-3">
        <Button type="button" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
