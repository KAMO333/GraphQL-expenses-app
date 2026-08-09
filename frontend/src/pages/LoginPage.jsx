import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const fieldClass =
  "w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all duration-200 placeholder:text-slate-400 font-medium";
const labelClass =
  "block text-xs font-bold tracking-wide text-slate-500 uppercase mb-2 ml-1";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { input: loginData } });
      toast.success("Welcome back!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // Added py-16 here to create a buffer at the top and bottom of the viewport
    <div className="flex items-center justify-center min-h-[85vh] px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-violet-600 mb-2">
            Welcome Back
          </p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Login
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Sign in to keep your ledger up to date
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className={labelClass} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={fieldClass}
              value={loginData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`${fieldClass} pr-12`}
                value={loginData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-violet-600 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 text-white font-bold text-base w-full rounded-xl px-4 py-4 bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-600/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-600 hover:text-violet-700 hover:underline font-bold transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
