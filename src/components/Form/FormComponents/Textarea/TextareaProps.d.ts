import { ChangeEvent } from "react";

export type TextareaProps = {
  id: string;
  labelText: string;
  value: string;
  placeholder?: string;
  cols: number;
  rows: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};
