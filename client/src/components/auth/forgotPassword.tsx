import { useState } from "react";
import { MdOutlineAttachEmail } from "react-icons/md";
import { sendResetPassword } from "../../lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [resetPassEmail, setResetPassEmail] = useState("");
  const sendLink = async (e: React.MouseEvent) => {
    e.preventDefault();
      const res = await sendResetPassword(resetPassEmail.toLowerCase());

      const { message } = await res.json();
      if (res.ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }
   navigate('/')
  };
  return (
    <>
      <div
        className=" italic font-bold text-primary font-mono tracking-widest"
        onClick={() => {
          const modal = document.getElementById(
            "forgot-pass"
          )! as HTMLDialogElement;
          return modal.showModal();
        }}
      >
        forgot password?
      </div>
      <dialog id="forgot-pass" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
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
                (resetPassEmail.trim() || resetPassEmail.length < 6) === ""
                  ? "btn btn-sm  btn-disabled"
                  : "btn btn-info btn-sm "
              }
              onClick={sendLink}
            >
              <MdOutlineAttachEmail />
              Send Reset Link
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ForgotPassword;
