import React from "react";
import { Input, InputLabel } from "@mui/material";
import styles from './styles';

type InputFormProps = {
  placeholder: string, 
  value: string, 
  type?: string,
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
};
const InputForm: React.FC<InputFormProps> = ({placeholder, value, type='text', onChange}) => (
  <div>
    <InputLabel sx={styles.label}>{placeholder}</InputLabel>
    <Input
      fullWidth
      sx={styles.inputText}
      size="small"
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InputForm;