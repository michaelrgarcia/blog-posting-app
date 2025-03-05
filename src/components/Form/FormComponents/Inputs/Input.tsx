import { InputProps } from "./InputProps";

import styles from "./Input.module.css";

function Input({
  id,
  labelText,
  value,
  placeholder,
  onChange,
  type,
}: InputProps) {
  return (
    <div className={styles.inputFormRow}>
      <label htmlFor={id}>{labelText} </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="on"
      />
    </div>
  );
}

export default Input;
