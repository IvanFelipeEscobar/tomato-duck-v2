
import { FaUserCheck } from "react-icons/fa6";
import { sendVerifyEmail } from "../../lib/api";
import { toast } from "react-toastify";
import { MdOutgoingMail } from "react-icons/md";

const VerifyAccountModal = () => {
  return (
    <>
      <button
        className="btn btn-sm btn-info"
        onClick={() => {
          const modal = document.getElementById("verify")! as HTMLDialogElement;
          modal.showModal();
        }}
      >
        <FaUserCheck />
        Verify Account
      </button>
      <dialog id="verify" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">ALmost there!</h3>
          <p >
            Click the button to send verification email
          </p>
          <button className="btn btn-sm btn-error m-4"  onClick={async () => {
              const em = await sendVerifyEmail();
              const { message } = await em.json();
              if (em.ok) {
                toast.success(message);
              } else {
                toast.error(message);
              }
            }}><MdOutgoingMail />Send Email</button>
          <div className="divider"></div>
          <p className="py-1">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default VerifyAccountModal;
