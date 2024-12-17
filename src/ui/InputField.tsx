import ErrorMessage from "./ErrorMessage";
import { registerSchemaType } from "../models/registerModel";
import { UseFormRegister } from "react-hook-form";
import Input from "./Input";
import { capitalizeFirstWord } from "../helper/utils";

interface InputFieldProps {
  name: "username" | "password" | "confirmPassword";
  type: "text" | "password";
  errorMessage: string | undefined;
  label?: string;
  register: UseFormRegister<registerSchemaType>;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  errorMessage,
  label,
  register,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{capitalizeFirstWord(label || name)}:</label>

      <Input
        id={name}
        type={type}
        className={`mb-1 ${errorMessage && "border-red-500"}`}
        {...register(name)}
      />

      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default InputField;
