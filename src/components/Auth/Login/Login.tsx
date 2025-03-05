import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../../Form/Form";

import { InputProps } from "../../Form/FormComponents/Inputs/InputProps";

import "./Login.module.css";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onUsernameUpdate = (e: FormEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, username: e.currentTarget.value });
  };

  const onPasswordUpdate = (e: FormEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, password: e.currentTarget.value });
  };

  const onLogin = async () => {
    try {
      const loginAttempt = await fetch("http://localhost:3000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const { message, token } = await loginAttempt.json();

      if (loginAttempt.ok && token) {
        localStorage.setItem("jwt", String(token));

        navigate("/");
      } else {
        setError(message);
      }
    } catch (err: unknown) {
      console.error(err);

      setError("Error. Please try logging in again.");
    }
  };

  const loginFormInputs: InputProps[] = [
    {
      id: "username",
      labelText: "Username",
      value: loginDetails.username,
      onChange: (e) => onUsernameUpdate(e),
      type: "text",
    },
    {
      id: "password",
      labelText: "Password",
      value: loginDetails.password,
      onChange: (e) => onPasswordUpdate(e),
    },
  ];

  return (
    <>
      <h1>Blogger</h1>
      <main>
        <Form
          inputs={loginFormInputs}
          submitBtnTxt="Log in"
          submitBtnColor="rgb(105, 192, 135)"
          error={error}
          onSubmit={onLogin}
        />
      </main>
    </>
  );
}

export default Login;
