import { InputField } from "../../ui";
import { useAuthStore } from "../../../store/authStore";
import { SubmitButton } from "../../ui/Buttons";
import toast from "react-hot-toast";

function ProfileForm() {
  // Retrieve user email from the auth store
  const { email } = useAuthStore((state) => state.user);

  // Handle email update (currently not available)
  const handleUpdateEmail = () => {
    toast.error("Email update option is not available yet");
  };

  // Handle password update (currently not available)
  const handleUpdatePassword = () => {
    toast.error("Password update option is not available yet");
  };

  return (
    <div className="w-full max-w-md p-4 border border-default rounded-lg">
      <h1 className="text-default font-semibold text-xl md:text-2xl text-center mb-4">Profile</h1>
      
      {/* Form containing user's email and password inputs */}
      <form action="" className="grid gap-2">
        <InputField label="Email" type="text" value={email} disabled={true} />
        <InputField label="Password" type="password" value="·········" disabled={true} />
      </form>

      {/* Buttons for updating email and password (currently not available) */}
      <div className="flex gap-4 py-2 mt-4">
        <SubmitButton buttonText="Update Email" onClick={handleUpdateEmail} />
        <SubmitButton buttonText="Update Password" onClick={handleUpdatePassword} />
      </div>
    </div>
  );
}

export default ProfileForm;
