import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = forwardRef(
  ({ ...inputProps }, ref: LegacyRef<HTMLInputElement> | undefined) => {
    return (
      <input
        ref={ref}
        type="text"
        {...inputProps}
        className={`rounded-md border-b-4 px-2 py-1 text-black outline-none ${inputProps.className}`}
      />
    );
  },
);
Input.displayName = "Input";

export default Input;
