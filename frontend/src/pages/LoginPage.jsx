import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

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
    if (!loginData.username || !loginData.password)
      return toast.error("Please fill in all fields");
    try {
      await login({ variables: { input: loginData } });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md rounded-lg bg-panel border border-hairline shadow-panel overflow-hidden">
        <div className="px-8 pt-8 pb-2 text-center border-b border-hairline">
          <p className="text-[11px] tracking-widest2 text-muted uppercase mb-3">
            Welcome back
          </p>
          <h1 className="font-display text-3xl text-paper mb-2">Login</h1>
          <p className="text-sm text-muted pb-6">
            Sign in to keep your ledger up to date
          </p>
        </div>
        <div className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Username"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />

            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <div>
              <button
                type="submit"
                className="w-full bg-gold text-ink font-semibold p-3 rounded-md hover:bg-gold-bright focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-panel transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-muted text-center">
            <p>
              {"Don't"} have an account?{" "}
              <Link
                to="/signup"
                className="text-gold hover:text-gold-bright hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
