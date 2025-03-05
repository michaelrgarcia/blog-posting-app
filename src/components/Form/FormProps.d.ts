import { InputProps } from "./FormComponents/Inputs/InputProps";

export interface FormProps {
  inputs: InputProps[];
  submitBtnTxt?: string;
  submitBtnColor?: string; // a valid CSS color property
  error: string | null;
  onSubmit: () => void;
}
