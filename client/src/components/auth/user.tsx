import { FaUserCheck } from "react-icons/fa6";
import useAuthStore from "../../lib/authStore";
import AuthHook from "./useAuthHook";
import VerifyAccountModal from "./verifyAccountModal";
import { Link } from "react-router-dom";
const User = () => {
  const { user } = useAuthStore();
  AuthHook();
  return (
    <div className="flex  items-center justify-center py-12">
      <div className="card  bg-base-100 max-w-[500px] bg-opacity-55 ">
        <div className="card-body">
          {user?.isVerified ? (
            <>
              <h2 className="text-lg font-semibold mb-2 flex justify-between">
                <span>User Information </span>{" "}
                <span>
                  <FaUserCheck />
                </span>
              </h2>
              <p className="text-sm">Email: {user!.email}</p>
              <p className="text-sm">Name: {user!.userName}</p>
             <Link to='/user/changepassword'> <button className="btn btn-sm w-full btn-success">
                Change Password
              </button></Link>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2 ">
                User Account not verified
              </h2>
              <p className="text-sm text-gray-600">
                Account must be verified before any changes can be made. Check
                your email, or you can click below to receive another
                verification email
              </p>
              <VerifyAccountModal />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
