import React, { useState } from "react";
import useAuthStore from "../../lib/authStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPassword from "./forgotPassword";
import { MdLogin } from "react-icons/md";
import { toast } from "react-toastify";
import { sendVerifyEmail } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../../lib/taskStore";

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("login");
  const [passState, setPassState] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { signIn, signUp, user } = useAuthStore();
  const {setUser} = useTaskStore()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, username, password } = formData;
    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return;
    }

    if (type === "login") {
      await signIn(email.toLowerCase(), password);
    } else {
      await signUp(username, email.toLowerCase(), password);

      const em = await sendVerifyEmail();
      const { message } = await em.json();
      if (em.ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
setUser(user!)
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center py-12 ">
      <div className="max-w-md w-full space-y-6 bg-base-100 bg-opacity-65 rounded-xl px-6 py-12">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-error font-serif">
            {type === "login"
              ? "Log in to your account"
              : "Create a new account"}
          </h2>
        </div>
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          {type === "signup" && (
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="input w-full input-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input w-full input-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              id="password"
              name="password"
              type={passState === "password" ? "password" : "text"}
              className="input input-sm w-full "
              autoComplete="current-password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <div>
              {passState === "password" ? (
                <div
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setPassState("notpassword");
                  }}
                >
                  <FaEye />
                </div>
              ) : (
                <div
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setPassState("password");
                  }}
                >
                  <FaEyeSlash />
                </div>
              )}
            </div>
          </div>
          <div className="divider"></div>
          <div>
            <button type="submit" className="btn btn-primary w-full btn-sm">
              <MdLogin /> {type === "login" ? "Log in" : "Sign up"}
            </button>
          </div>
        </form>
        <div className="text-center">
          {type === "login" && <ForgotPassword />}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            onClick={() => {
              setType(type === "login" ? "signup" : "login");
              setFormData({ email: "", username: "", password: "" });
            }}
            className="text-sm font-medium text-success hover:text-indigo-500"
          >
            {type === "login" ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
