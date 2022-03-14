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
  labelClassName,
  label,
  description,
  defaultPlaceHolder,
  uniqueSelector,
  descriptionClassName,
  ...props
}: any) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div>
        <label className={labelClassName} htmlFor={name}>
          {label}
        </label>
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
      <div className="mt-1">
        <span className={descriptionClassName}>{description}</span>

        {<span className="text-sm text-red-500 ">{error && error}</span>}
      </div>
    </div>
  );
};

FormInput.defaultProps = {
  type: "text",
  className: "",
};

export default FormInput;
