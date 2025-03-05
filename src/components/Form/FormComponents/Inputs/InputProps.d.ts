import { ChangeEvent } from "react";

export interface InputProps {
  id: string;
  labelText: string;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
