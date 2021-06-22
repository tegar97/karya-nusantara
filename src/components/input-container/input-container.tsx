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
  defaultPlaceHolder,
  ...props
}: any) => {
  return (
    <div style={{ marginBottom: "10px" }}>
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
          style={{ border: error && "solid 1px red" }}
          defaultPlaceHolder={defaultPlaceHolder}
        />
      </div>
      {<span className="text-sm text-red-500 ">{error && error}</span>}
    </div>
  );
};

FormInput.defaultProps = {
  type: "text",
  className: "",
};

export default FormInput;
