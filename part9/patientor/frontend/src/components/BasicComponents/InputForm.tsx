import React from "react";
import { Input } from "@mui/material";

type InputFormProps = {
  placeholder: string, 
  value: string, 
  type?: string,
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
};
const InputForm: React.FC<InputFormProps> = ({placeholder, value, type='text', onChange}) => 
  <Input
    fullWidth
    sx={{margin: '0.5rem 0'}}
    size="small"
    value={value}
    type={type}
    onChange={onChange}
    placeholder={placeholder}
  />;

export default InputForm;