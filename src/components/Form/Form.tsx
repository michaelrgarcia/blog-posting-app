import { ReactElement } from "react";

import formStyles from "./Form.module.css";

interface FormProps {
  children: ReactElement; // specifically, FormComponents
}

function Form({ children }: FormProps) {
  return (
    <form style={formStyles}>
      {children}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
