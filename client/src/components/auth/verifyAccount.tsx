import { useNavigate, useParams } from "react-router-dom";
import { verifyAccount } from "../../lib/api";
import { toast } from "react-toastify";
import { FaUserCheck } from "react-icons/fa6";
import useAuthStore from "../../lib/authStore";

const VerifyAccount = () => {
  const { verificationToken } = useParams();
  const {logOut}=useAuthStore()
  const navigate = useNavigate();
  return (
    <div className="flex justify-center pt-20">
      <div className="bg-base-100 card">
        <div className="card-body">
          <div className="card-title">Verify your Account</div>
          <p>click the button to verify your account</p>
          <button
            className="btn btn-info"
            onClick={async () => {
              const res = await verifyAccount(verificationToken!);
              const { message } = await res.json();
              if (res.ok) {
                toast.success(message);
              } else {
                toast.error(message);
              }
              logOut()
              navigate("/user/signup");
            }}
          >
            <FaUserCheck />
            Verify Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
