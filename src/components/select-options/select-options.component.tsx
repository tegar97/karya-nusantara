import React from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Select } from "./select-options.styled";
const SelectOptions = ({
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
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        className={className}
        style={{ border: error && "solid 1px red" }}
        defaultPlaceHolder={defaultPlaceHolder}
      >
        {children}
      </Select>

      {<span className="text-sm text-red-500 ">{error && error}</span>}
    </div>
  );
};

SelectOptions.defaultProps = {
  type: "text",
  className: "",
};

export default SelectOptions;
