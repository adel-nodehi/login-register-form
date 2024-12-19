import React from "react";
import RegisterForm from "../features/authentication/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="bg-blue-400 min-h-dvh flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default Register;
