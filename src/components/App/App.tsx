import { FormEvent, useState } from "react";

import Form from "../Form/Form";
import PasswordInput from "../Form/FormComponents/Inputs/PasswordInput/PasswordInput";

import "./App.module.css";

function App() {
  // check for JWT in localStorage
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const onPasswordUpdate = (e: FormEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, password: e.currentTarget.value });
  };

  return (
    <>
      <header>
        <h1>Log in</h1>
      </header>
      <main>
        <Form>
          <PasswordInput
            id="password"
            labelText="Password"
            value={loginDetails.password}
            placeholder=""
            onChange={(e) => onPasswordUpdate(e)}
          />
        </Form>
      </main>
    </>
  );
}

export default App;
