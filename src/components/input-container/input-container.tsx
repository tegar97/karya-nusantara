import React from "react";
import { Input } from "./input-container.styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
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
  uniqueSelector,
  ...props
}: any) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div>
        <label htmlFor={name}>{label}</label>
        {uniqueSelector ? (
          <div className="relative flex items-center ">
            <Input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              disabled
              className={className}
              style={{ border: error && "solid 1px red" }}
              defaultPlaceHolder={defaultPlaceHolder}
            />
            <ArrowDownwardIcon className="absolute right-2" />
          </div>
        ) : (
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
        )}
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
