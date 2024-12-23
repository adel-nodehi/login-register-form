import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...inputProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    if (inputProps.type === "password")
      return (
        <div
          className={`flex items-center overflow-hidden rounded-md border-b-4 bg-white ${inputProps.className}`}
        >
          <input
            ref={ref}
            {...inputProps}
            type={showPassword ? "text" : "password"}
            className="grow px-2 py-1 text-black outline-none"
          />

          <span
            role="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="p-2"
          >
            <FontAwesomeIcon
              className="text-black"
              icon={showPassword ? faEye : faEyeSlash}
            />
          </span>
        </div>
      );

    return (
      <input
        ref={ref}
        type="text"
        {...inputProps}
        className={`rounded-md border-b-4 bg-white px-2 py-1 text-black outline-none ${inputProps.className}`}
      />
    );
  },
);
Input.displayName = "Input";

export default Input;
