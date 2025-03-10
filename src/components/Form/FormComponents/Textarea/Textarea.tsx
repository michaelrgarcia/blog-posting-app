import { TextareaProps } from "./TextareaProps";

import styles from "./Textarea.module.css";

function Textarea({
  id,
  labelText,
  value,
  placeholder,
  onChange,
}: TextareaProps) {
  return (
    <div className={styles.textAreaFormRow}>
      <label htmlFor={id}>{labelText} </label>
      <textarea
        id={id}
        className={styles.textArea}
        cols={120}
        rows={10}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default Textarea;
