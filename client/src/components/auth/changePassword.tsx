import React, { useState } from "react";
import { TbPasswordUser } from "react-icons/tb";
import { toast } from "react-toastify";
import { changePassword } from "../../lib/api";
import useAuthStore from "../../lib/authStore";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassVer, setNewPassVer] = useState("");
  const { logOut, isLoading } = useAuthStore();
  const nav = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      oldPass.trim() === "" ||
      newPass.trim() === "" ||
      newPassVer.trim() === ""
    ) {
      toast.error("please fill out all fields to continue");
      return;
    }
    if (newPass.length < 6) {
      toast.error("New password must be atleast 6 characters in length");
      return;
    }
    if (newPass !== newPassVer) {
      toast.error("new passwords need to match ");
      return;
    }
    try {
      const res = await changePassword(oldPass, newPass);
      const { message } = await res.json();
      if (res.ok) {
        toast.success(message);
        logOut();
        nav("/user/signup");
      } else {
        toast.error(message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex justify-center pt-12" onSubmit={handleReset}>
      <div className="bg-base-100 card max-w-96">
        <div className="card-body">
          <div className="card-title">Reset Your Password</div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="old password"
              name="oldPass"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="new password"
              name="changePass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="verify new password"
              name="changePassVer"
              value={newPassVer}
              onChange={(e) => setNewPassVer(e.target.value)}
            />
          </label>
          <button className="btn btn-info">
           {isLoading ? <span className="loading loading-spinner loading-lg"></span> :<> <TbPasswordUser />
            Submit Password</>}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
