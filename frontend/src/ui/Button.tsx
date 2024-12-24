import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({ disable = false, children }) => {
  return (
    <button
      disabled={disable}
      className={`mt-5 inline-block w-full rounded-lg bg-white px-4 py-2 font-bold tracking-wide text-black ${disable ? "cursor-not-allowed bg-slate-400" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
