import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import axiosLib from "axios";

import { registerSchema, registerSchemaType } from "../../models/registerModel";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import axios from "../../api/axios";
import From from "../../ui/Form";
import { API_CONFIG } from "../../api/apiConfig";
import { promiseToast } from "../../helper/toast";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<registerSchemaType> = async ({
    username,
    password,
  }) => {
    const { triggerErrorToast, triggerSuccessToast } = promiseToast(
      "Registering your account...",
    );

    try {
      await axios.post(
        API_CONFIG.register,
        JSON.stringify({ user: username, pwd: password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      triggerSuccessToast(
        "You'r account successfully created, please login to your account",
      );

      navigate("/login");
    } catch (err) {
      let errorMessage = "Something woes wrong, Try again";

      if (axiosLib.isAxiosError(err)) {
        if (!err.response) {
          errorMessage = "No server Response";
        } else if (err.response.status === 409) {
          errorMessage = "Username Taken";
        } else {
          errorMessage = "Registration failed";
        }
      }

      triggerErrorToast(errorMessage);
    }
  };

  return (
    <From onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-2 text-3xl font-bold tracking-wide">Register</h2>

      <div className="space-y-2">
        <InputField
          type="text"
          error={errors.username}
          {...register("username")}
        />

        <InputField
          type="password"
          error={errors.password}
          {...register("password")}
        />

        <InputField
          label="confirm Password"
          type="password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </div>

      <Button disable={isFormSubmitting}>Sign Up</Button>

      <p className="mt-5 flex gap-1">
        already registered?
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </From>
  );
};

export default RegisterForm;
