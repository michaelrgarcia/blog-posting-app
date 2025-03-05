import { FormEvent, useState } from "react";

import Form from "../Form/Form";

import { InputProps } from "../Form/FormComponents/Inputs/InputProps";

import "./App.module.css";

function App() {
  // check for JWT in localStorage
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const onUsernameUpdate = (e: FormEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, username: e.currentTarget.value });
  };

  const onPasswordUpdate = (e: FormEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, password: e.currentTarget.value });
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
      <header>
        <h1>Blogger</h1>
      </header>
      <main>
        <Form
          inputs={loginFormInputs}
          submitBtnTxt="Log in"
          submitBtnColor="rgb(105, 192, 135)"
        />
      </main>
    </>
  );
}

export default App;
