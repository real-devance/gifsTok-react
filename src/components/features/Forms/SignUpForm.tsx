import { InputField, ErrorMessage } from "../../ui";
import { SubmitButton } from "../../ui/Buttons";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";
import { auth } from "../../../config/firebase";
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast';

type FormFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUpForm() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormFields>();
  const navigate = useNavigate();

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Attempt to create a new user with email and password
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Sign Up Successful');
      navigate("/"); // Redirect to home page after successful sign-up
    } catch (error: any) {
      // Handle errors and show appropriate error messages
      if (error.code.includes("email-already-in-use")) {
        toast.error("Email already exists. Please log in");
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
  };

  return (
    <div className="w-full max-w-md p-4 border border-default rounded-lg">
      <h1 className="text-default font-semibold text-xl md:text-2xl text-center mb-4">Create an account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        {/* Email Field */}
        <div className="grid gap-1 mb-2">
          <InputField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
            type="email"
            placeholder="your@email.com"
            label="Email"
          />
          {errors.email && <ErrorMessage message={errors.email.message || ""} />}
        </div>

        {/* Password Field */}
        <div className="grid gap-1 mb-2">
          <InputField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            placeholder="·········"
            className="placeholder:tracking-[.4ch]"
            label="Password"
          />
          {errors.password && <ErrorMessage message={errors.password.message || ""} />}
        </div>

        {/* Confirm Password Field */}
        <div className="grid gap-2">
          <InputField
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            placeholder="·········"
            className="placeholder:tracking-widest"
            label="Confirm Password"
          />
          {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message || ""} />}
        </div>

        {/* Link to Login Page */}
        <div className="text-default text-sm flex gap-2">
          <p className="font-semibold">Already have an account? </p>
          <Link to="/auth/login" className="text-blue-500">Login</Link>
        </div>

        {/* Submit Button */}
        <SubmitButton buttonText="Sign Up" className="mt-2" />
      </form>
    </div>
  );
}

export default SignUpForm;
