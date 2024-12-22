import ErrorMessage from "./ErrorMessage";
import { FieldError } from "react-hook-form";
import Input from "./Input";
import { capitalizeFirstWord } from "../helper/utils";
import { forwardRef } from "react";

interface InputFieldProps {
  name: string;
  type?: "text" | "password";
  error: FieldError | undefined;
  label?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type = "text", error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={props.name}>
          {capitalizeFirstWord(label || props.name)}:
        </label>

        <Input
          ref={ref}
          id={props.name}
          type={type}
          className={`mb-1 ${error?.message && "border-red-500"}`}
          {...props}
        />

        <ErrorMessage message={error?.message} />
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
