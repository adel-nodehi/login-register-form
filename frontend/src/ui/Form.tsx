import React, { ReactNode } from "react";

interface FormProps {
  onSubmit: () => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-80 rounded-lg bg-blue-800 px-2 py-4 text-white shadow-xl"
      autoComplete="off"
    >
      {children}
    </form>
  );
};

export default Form;
