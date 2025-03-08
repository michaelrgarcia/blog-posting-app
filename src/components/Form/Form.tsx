import Input from "./FormComponents/Inputs/Input";
import PasswordInput from "./FormComponents/Inputs/PasswordInput/PasswordInput";

import { FormProps } from "./FormProps";

import styles from "./Form.module.css";

function Form({
  inputs,
  submitBtnTxt,
  submitBtnColor,
  error,
  onSubmit,
}: FormProps) {
  return (
    <>
      <p style={{ color: "red" }}>{error}</p>
      <form className={styles.formComponent} onSubmit={onSubmit}>
        {inputs.map((input, index) => {
          if (!input.type) {
            return (
              <PasswordInput
                id={input.id}
                labelText={input.labelText}
                value={input.value}
                placeholder={input.placeholder}
                onChange={input.onChange}
                key={index}
              />
            );
          } else {
            return (
              <Input
                id={input.id}
                labelText={input.labelText}
                value={input.value}
                placeholder={input.placeholder}
                onChange={input.onChange}
                type={input.type}
                key={index}
              />
            );
          }
        })}
        <button
          type="submit"
          className={styles.submitBtn}
          style={{ backgroundColor: submitBtnColor }}
        >
          {submitBtnTxt}
        </button>
      </form>
    </>
  );
}

export default Form;
