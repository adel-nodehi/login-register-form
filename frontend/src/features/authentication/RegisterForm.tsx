import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, registerSchemaType } from "../../models/registerModel";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import { Link } from "react-router";

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<registerSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-80 rounded-lg bg-blue-800 px-2 py-4 text-white shadow-xl"
      autoComplete="off"
    >
      <h2 className="mb-2 text-3xl font-bold tracking-wide">Register</h2>

      <div className="space-y-2">
        <InputField
          name="username"
          type="text"
          register={register}
          errorMessage={errors.username?.message}
        />

        <InputField
          name="password"
          type="password"
          register={register}
          errorMessage={errors.password?.message}
        />

        <InputField
          name="confirmPassword"
          label="confirm Password"
          type="password"
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>

      <Button>Sign Up</Button>

      <p className="mt-5 flex gap-1">
        already registered?
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
