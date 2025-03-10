import { InputProps } from "./FormComponents/Inputs/InputProps";
import { TextareaProps } from "./FormComponents/Textarea/TextareaProps";

export type FormFieldProps = InputProps | TextareaProps;

export interface FormProps {
  inputs: FormFieldProps[];
  submitBtnTxt?: string;
  submitBtnColor?: string; // a valid CSS color property
  error: string | null;
  onSubmit: (e: FormEvent<SubmitEvent>) => Promise<void>;
}
