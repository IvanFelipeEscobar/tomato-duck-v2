import useAuthStore from "../../lib/authStore";
import AuthHook from "./useAuthHook";
const User = () => {
  const { user } = useAuthStore();
AuthHook()
  return (
    <div className="flex  items-center justify-center py-12">
      <div className="card  bg-base-100 bg-opacity-55 ">
        <div className="card-body">
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <p className="text-sm text-gray-600">Email: {user!.email}</p>
          <p className="text-sm text-gray-600">Name: {user!.userName}</p>
          <p>{user!.isVerified ? 'verified' : 'not verified'}</p>
          <button className="btn btn-sm btn-info">Edit Profile</button>
          <button className="btn btn-sm btn-success">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default User;
