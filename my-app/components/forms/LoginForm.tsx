"use client";

import React, { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;

    const values = {
      email: target.email.value.trim(),
      password: target.password.value.trim(),
    };

    if (!values.email || !values.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const credential = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (credential?.ok) {
        console.log("Login successful");
        localStorage.setItem("user", "disconnect");

        setErrorMessage("");
      } else {
        setErrorMessage(credential?.error as any);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error as any);
    }
  }
  async function loginWithGoogle() :Promise<void>{
    const result: any = signIn("google");
    localStorage.setItem("user", "disconnect");
  }


  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;

    const values = {
      email: target.email.value.trim(),
      password: target.password.value.trim(),
      name: target.userName.value.trim(),
    };

    if (!values.email || !values.password || !values.name) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/register", values);

      if (response.status === 200) {
        alert("A verification email has been sent to your email address");
        setErrorMessage("");
        setIsLogin(true);
      } else if (response.status === 201) {
        alert("Successful registration! You can now log in.");
        setIsLogin(true);
        setErrorMessage("");
      } else if (response.status === 400) {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(error as any);
        }
      } else {
        console.error("Error during login:", error);
        setErrorMessage(error as any);
      }
    }
  }

  async function handleForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("/api/forgotPassword", { email });

      if (response.status === 200) {
        alert("Password reset link sent to your email.");
        setIsForgotPassword(false);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error as any);
    }
  }

  return (
    <div className="flex flex-col w-full justify-center items-center my-5">
      {!isForgotPassword ? (
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="w-full"
        >
          <h1 className="text-center text-xl font-semibold mb-6">
            {isLogin ? "Login" : "Register"}
          </h1>
          {!isLogin && (
            <InputLogin
              label="Name"
              type="text"
              id="userName"
              name="userName"
              placeholder="Type Name"
              required
            />
          )}
          <InputLogin
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Type Email"
            required
          />
          <div className="mb-2 w-full">
            <label
              htmlFor="password"
              className="block w-[80%] mx-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type Password"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-[80%] mx-auto p-2.5 dark:bg-gray-700
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500 transition-colors"
            />
            {isLogin && (
              <div className="w-[80%] mx-auto text-right mt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <div className="w-full flex justify-center items-center mt-6">
            <button
              type="submit"
              className="focus:outline-none w-[80%] text-white bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400
hover:from-orange-400 hover:via-purple-400 hover:to-blue-300
 font-medium rounded-lg text-sm px-5 py-2.5
               dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
               transition-colors"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {errorMessage && (
            <div className="w-[80%] mx-auto mt-4 text-center text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setErrorMessage("");
              }}
              className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword} className="w-full">
          <h1 className="text-center text-xl font-semibold mb-6">
            Forgot Password
          </h1>
          <InputLogin
            label="Email"
            type="email"
            id="forgot-email"
            name="forgot-email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-full flex flex-col items-center gap-2">
            <button
              type="submit"
              className="focus:outline-none w-[80%] text-white bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400
hover:from-orange-400 hover:via-purple-400 hover:to-blue-300
 hover:bg-blue-700 
               focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
               my-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
               transition-colors"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}

      <div className="w-full flex items-center justify-center my-4">
        <div className="border-t border-gray-300 w-[35%]"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="border-t border-gray-300 w-[35%]"></div>
      </div>

      <div className="flex w-full flex-col justify-center items-center">
        <button
          onClick={loginWithGoogle}
          className="flex w-[80%] items-center justify-center bg-white
           dark:bg-gray-900 border border-gray-300 rounded-lg 
           shadow-md px-6 py-2 text-sm font-medium text-gray-800
           dark:text-white hover:bg-gray-200 focus:outline-none 
           focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
           transition-all"
        >
          <FcGoogle className="h-6 w-6 mr-2" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

type InputLoginProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function InputLogin({ label, onChange, ...props }: InputLoginProps) {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={props.id}
        className="block w-[80%] mx-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-[80%] mx-auto p-2.5 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
          dark:focus:border-blue-500 transition-colors"
        {...props}
      />
    </div>
  );
}

