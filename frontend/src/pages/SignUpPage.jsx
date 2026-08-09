import { useState } from "react";
import { Link } from "react-router-dom";
import RadioButton from "../components/RadioButton";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [signup, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          input: signUpData,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-md rounded-lg bg-panel border border-hairline shadow-panel overflow-hidden">
        <div className="px-8 pt-8 pb-2 text-center border-b border-hairline">
          <p className="text-[11px] tracking-widest2 text-muted uppercase mb-3">
            Open an account
          </p>
          <h1 className="font-display text-3xl text-paper mb-2">Sign Up</h1>
          <p className="text-sm text-muted pb-6">
            Join to keep track of your expenses
          </p>
        </div>
        <div className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              id="name"
              name="name"
              value={signUpData.name}
              onChange={handleChange}
            />
            <InputField
              label="Username"
              id="username"
              name="username"
              value={signUpData.username}
              onChange={handleChange}
            />

            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={signUpData.password}
              onChange={handleChange}
            />
            <div>
              <p className="block text-[11px] font-semibold uppercase tracking-widest2 text-muted mb-2">
                Gender
              </p>
              <div className="flex gap-3">
                <RadioButton
                  id="male"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={signUpData.gender === "male"}
                />
                <RadioButton
                  id="female"
                  label="Female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={signUpData.gender === "female"}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gold text-ink font-semibold p-3 rounded-md hover:bg-gold-bright focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-panel transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-muted text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-gold hover:text-gold-bright hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
