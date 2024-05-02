import React, { useState } from "react";
import useAuthStore from "../../lib/authStore";

const AuthForm: React.FC = () => {
  const [type, setType] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, username, password } = formData;
    try {
      if (type === "login") {
        await useAuthStore.getState().signIn(email.toLowerCase(), password);
      } else {
        await useAuthStore.getState().signUp(username, email.toLowerCase(), password);
      }
      // Handle success: Redirect or show a success message
    } catch (error) {
      // Handle error: Display error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center py-12 ">
      <div className="max-w-md w-full space-y-8 bg-base-100 bg-opacity-65 rounded-xl px-6 py-12">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-error font-serif">
            {type === "login"
              ? "Log in to your account"
              : "Create a new account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input w-full input-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full btn-sm"
            >
              {type === "login" ? "Log in" : "Sign up"}
            </button>
          </div>
        </form>
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
