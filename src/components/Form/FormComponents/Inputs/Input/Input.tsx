import { InputProps } from "../InputProps";

import styles from "./Input.module.css";

interface InputPropsWithInputType extends InputProps {
  type: string;
}

function Input({
  id,
  labelText,
  value,
  placeholder,
  onChange,
  type,
}: InputPropsWithInputType) {
  return (
    <div className={styles.passwordInputFormRow}>
      <label htmlFor={id}>{labelText} </label>
      <div className={styles.passwordInputContainer}>
        <input
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Input;
