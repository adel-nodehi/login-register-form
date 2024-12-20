import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="mt-5 inline-block w-full rounded-lg bg-white px-4 py-2 font-bold tracking-wide text-black">
      {children}
    </button>
  );
};

export default Button;
