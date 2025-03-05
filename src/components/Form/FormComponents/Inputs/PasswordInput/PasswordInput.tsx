import { useState } from "react";

import { InputProps } from "../InputProps";

import OpenEye from "./eye.svg";
import BlockedEye from "./eye-off.svg";

import styles from "./PasswordInput.module.css";

type InputTypes = "password" | "text";

function PasswordInput({
  id,
  labelText,
  value,
  placeholder,
  onChange,
}: InputProps) {
  const [inputType, setInputType] = useState<InputTypes>("password");

  function toggleVisibility() {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  return (
    <div className={styles.passwordInputFormRow}>
      <label htmlFor={id}>{labelText} </label>
      <div className={styles.passwordInputContainer}>
        <input
          type={inputType}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <img
          src={inputType === "password" ? BlockedEye : OpenEye}
          alt="Show"
          onClick={toggleVisibility}
          className={styles.visibilityToggle}
        />
      </div>
    </div>
  );
}

export default PasswordInput;
