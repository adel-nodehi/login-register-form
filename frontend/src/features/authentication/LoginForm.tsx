import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import axiosLib from "axios";

import Form from "../../ui/Form";
import InputField from "../../ui/InputField";
import { LoginSchema, LoginSchemaType } from "../../models/loginModel";
import Button from "../../ui/Button";
import axios from "../../api/axios";
import { API_CONFIG } from "../../api/apiConfig";
import { promiseToast } from "../../helper/toast";
import { useAuth } from "../../context/AuthContext";

const LoginForm: React.FC = () => {
  const { setAuth, allowPersist, toggleAllowPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: isFormSubmitting },
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    const { triggerErrorToast, triggerSuccessToast } =
      promiseToast("Logging in...");

    try {
      const response = await axios.post(
        API_CONFIG.login,
        JSON.stringify({ user: data.username, pwd: data.password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      setAuth({
        user: data.username,
        password: data.password,
        accessToken: response.data?.accessToken,
        roles: response.data?.roles,
      });

      reset();

      triggerSuccessToast("Login successfully");

      navigate(from, { replace: true });
    } catch (err) {
      let errorMessage;

      if (axiosLib.isAxiosError(err)) {
        if (!err.response) {
          errorMessage = "No server Response";
        } else if (err.response.status === 400) {
          errorMessage = "Missing Username or Password";
        } else if (err.response?.status === 401) {
          errorMessage = "unauthorize";
        } else {
          errorMessage = "login failed";
        }
      } else {
        console.log("some error occurred with login");
      }

      triggerErrorToast(errorMessage);
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

      <div className="mt-1 flex items-center space-x-1">
        <input
          id="persist"
          type="checkbox"
          value={String(allowPersist)}
          onChange={toggleAllowPersist}
          className="size-3 accent-blue-500"
        />
        <label htmlFor="persist" className="m-0 text-sm">
          Remember this divas
        </label>
      </div>

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
