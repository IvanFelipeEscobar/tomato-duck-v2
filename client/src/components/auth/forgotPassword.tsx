import { useState } from "react";
import { MdOutlineAttachEmail } from "react-icons/md";
import { sendResetPassword } from "../../lib/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [resetPassEmail, setResetPassEmail] = useState("");
  const sendLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
        const res = await sendResetPassword(resetPassEmail)
        if(res.ok) {
toast.success('Reset link sent to email')
        }else{
        const { message } = await res.json();
        toast.error(message);

        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className=" italic font-bold text-primary font-mono tracking-widest"
      >
        forgot password?
      </div>
      <div
        tabIndex={0}
        className="dropdown-content card shadow  w-80 bg-base-100 text-primary-content"
      >
        <div className="card-body">
          <h3 className="card-title font-mono tracking-widest">
            Reset password
          </h3>
          <div>
            <input
              id="reset-email"
              name="reset-password-email"
              type="email"
              autoComplete="email"
              className="input input-bordered w-full input-sm"
              placeholder="Email address"
              value={resetPassEmail}
              onChange={(e) => setResetPassEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={
              (resetPassEmail.trim()||resetPassEmail.length<6) === ""
                ? "btn btn-sm  btn-disabled"
                : "btn btn-info btn-sm "
            }
            onClick={sendLink}
          >
            <MdOutlineAttachEmail />
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
