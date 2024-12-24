import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import axiosLib from "axios";

import Form from "../../ui/Form";
import InputField from "../../ui/InputField";
import { LoginSchema, LoginSchemaType } from "../../models/loginModel";
import Button from "../../ui/Button";
import axios from "../../api/axios";

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: isFormSubmitting },
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user: data.username, pwd: data.password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log(response.data);
      console.log(response);
      console.log(JSON.stringify(response));
      console.log("access token", response.data?.accessToken);
      console.log(response.data?.roles);

      console.log("Login successfully");

      reset();
    } catch (err) {
      if (axiosLib.isAxiosError(err)) {
        if (!err.response) {
          console.log("No server Response");
        } else if (err.response.status === 400) {
          console.log("Missing Username or Password");
        } else if (err.response?.status === 401) {
          console.log("unauthorize");
        } else {
          console.log("login failed");
        }
      } else {
        console.log("some error occurred with login");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-2 text-3xl font-bold tracking-wide">Sign in</h2>

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
      </div>

      <Button disable={isFormSubmitting}>Sign In</Button>

      <p className="mt-5 flex gap-1">
        Need an Account?
        <Link to="/register" className="underline">
          Sign Up
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
