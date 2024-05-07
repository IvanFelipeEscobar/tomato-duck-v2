import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../lib/api";
import { TbPasswordUser } from "react-icons/tb";

const ResetPassword = () => {
  const {resetToken} = useParams();
  const [newPass, setNewPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const nav = useNavigate()
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== verPass) {
      toast.error("Passwords do not match");
      setVerPass("");
      return;
    }
    if (newPass.length < 6)
      return toast.error("Password must be atleast 6 characters");

    const res = await resetPassword(resetToken!, verPass);
    const { message } = await res.json();
    if (res.ok) {
      toast.success(message);
     nav('/user/signup')
    } else {
        toast.error(message);
        setVerPass("");
        setNewPass("");
    }
  };
  return (
    <form
      className="flex justify-center pt-12"
      onSubmit={handleReset}
    >
      <div className="bg-base-100 card max-w-96">
        <div className="card-body">
          <div className="card-title">Reset Your Password</div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="new password"
              name="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="verify password"
              name="verPass"
              value={verPass}
              onChange={(e) => setVerPass(e.target.value)}
            />
          </label>
          <button className="btn btn-info"><TbPasswordUser />Submit Password</button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
