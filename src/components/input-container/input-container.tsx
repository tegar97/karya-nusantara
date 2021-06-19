import React from "react";
import { Input } from "./input-container.styles";
const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  children,
  label,
  ...props
}: any) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        style={error && { border: "solid 1px red" }}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

FormInput.defaultProps = {
  type: "text",
  className: "",
};

export default FormInput;
