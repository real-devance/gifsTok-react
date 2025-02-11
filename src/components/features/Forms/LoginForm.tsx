import { InputField, ErrorMessage } from "../../ui";
import { SubmitButton } from "../../ui/Buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router';
import toast from "react-hot-toast";

type FormFields = {
  email: string;
  password: string;
};

function LoginForm() {
  // Initialize useForm hook for form handling
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
  const navigate = useNavigate();

  // onSubmit function for handling form submission
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login Successful. Redirecting"); // Success toast message
      navigate("/"); // Redirect to homepage after successful login
    } catch (error: any) {
      // Error handling for invalid credentials
      if (error.code.includes("invalid-credential")) {
        toast.error("Invalid Credential");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-md p-4
    border border-default
    rounded-lg">

      <h1 className="text-default font-semibold text-xl md:text-2xl text-center mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">

        {/* Email Field */}
        <div className="grid gap-1 mb-2">
          <InputField
            {...register("email", {
              required: "Email is required", // Validation for email field
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email", // Pattern validation for valid email
              },
            })}
            type="email"
            placeholder="your@email.com"
            label="Email"
          />
          {/* Display error message for email field */}
          {errors.email && <ErrorMessage message={errors.email.message || ""} />}
        </div>

        {/* Password Field */}
        <div className="grid gap-1">
          <InputField
            {...register("password", {
              required: "Password is required", // Validation for password field
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters", // Minimum length validation
              },
            })}
            type="password"
            placeholder="·········"
            className="placeholder:tracking-[.4ch]"
            label="Password"
          />
          {/* Display error message for password field */}
          {errors.password && <ErrorMessage message={errors.password.message || ""} />}
        </div>

        {/* Sign Up Redirect */}
        <div className="text-default text-sm flex gap-2">
          <p className="font-semibold">Don't have an account? </p>
          <Link to="/auth/signup" className="text-blue-500">Sign Up</Link>
        </div>

        {/* Submit Button */}
        <SubmitButton buttonText="Login" className="mt-5" />
      </form>
    </div>
  );
}

export default LoginForm;
